import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

// =============================================================================
// Manus Debug Collector - Vite Plugin
// Writes browser logs directly to files, trimmed when exceeding size limit
// =============================================================================

const PROJECT_ROOT = import.meta.dirname;
const LOG_DIR = path.join(PROJECT_ROOT, ".manus-logs");
const MAX_LOG_SIZE_BYTES = 1 * 1024 * 1024; // 1MB per log file
const TRIM_TARGET_BYTES = Math.floor(MAX_LOG_SIZE_BYTES * 0.6); // Trim to 60% to avoid constant re-trimming

type LogSource = "browserConsole" | "networkRequests" | "sessionReplay";

function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

function trimLogFile(logPath: string, maxSize: number) {
  try {
    if (!fs.existsSync(logPath) || fs.statSync(logPath).size <= maxSize) {
      return;
    }

    const lines = fs.readFileSync(logPath, "utf-8").split("\n");
    const keptLines: string[] = [];
    let keptBytes = 0;

    // Keep newest lines (from end) that fit within 60% of maxSize
    const targetSize = TRIM_TARGET_BYTES;
    for (let i = lines.length - 1; i >= 0; i--) {
      const lineBytes = Buffer.byteLength(`${lines[i]}\n`, "utf-8");
      if (keptBytes + lineBytes > targetSize) break;
      keptLines.unshift(lines[i]);
      keptBytes += lineBytes;
    }

    fs.writeFileSync(logPath, keptLines.join("\n"), "utf-8");
  } catch {
    /* ignore trim errors */
  }
}

function writeToLogFile(source: LogSource, entries: unknown[]) {
  if (entries.length === 0) return;

  ensureLogDir();
  const logPath = path.join(LOG_DIR, `${source}.log`);

  // Format entries with timestamps
  const lines = entries.map((entry) => {
    const ts = new Date().toISOString();
    return `[${ts}] ${JSON.stringify(entry)}`;
  });

  // Append to log file
  fs.appendFileSync(logPath, `${lines.join("\n")}\n`, "utf-8");

  // Trim if exceeds max size
  trimLogFile(logPath, MAX_LOG_SIZE_BYTES);
}

/**
 * Vite plugin to collect browser debug logs
 * - POST /__manus__/logs: Browser sends logs, written directly to files
 * - Files: browserConsole.log, networkRequests.log, sessionReplay.log
 * - Auto-trimmed when exceeding 1MB (keeps newest entries)
 */
function vitePluginManusDebugCollector(): Plugin {
  return {
    name: "manus-debug-collector",

    transformIndexHtml(html) {
      if (process.env.NODE_ENV === "production") {
        return html;
      }
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              src: "/__manus__/debug-collector.js",
              defer: true,
            },
            injectTo: "head",
          },
        ],
      };
    },

    configureServer(server: ViteDevServer) {
      // POST /__manus__/logs: Browser sends logs (written directly to files)
      server.middlewares.use("/__manus__/logs", (req, res, next) => {
        if (req.method !== "POST") {
          return next();
        }

        const handlePayload = (payload: any) => {
          // Write logs directly to files
          if (payload.consoleLogs?.length > 0) {
            writeToLogFile("browserConsole", payload.consoleLogs);
          }
          if (payload.networkRequests?.length > 0) {
            writeToLogFile("networkRequests", payload.networkRequests);
          }
          if (payload.sessionEvents?.length > 0) {
            writeToLogFile("sessionReplay", payload.sessionEvents);
          }

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true }));
        };

        const reqBody = (req as { body?: unknown }).body;
        if (reqBody && typeof reqBody === "object") {
          try {
            handlePayload(reqBody);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
          return;
        }

        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });

        req.on("end", () => {
          try {
            const payload = JSON.parse(body);
            handlePayload(payload);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
        });
      });
    },
  };
}

const DAYS_DIR = path.join(PROJECT_ROOT, "client/public/days");
const DAY_PHOTO_CACHE = "public, max-age=86400, stale-while-revalidate=604800";
const DAY_PHOTO_NO_STORE = "no-store, no-cache, must-revalidate";
const DAY_PHOTO_BUILD_ID =
  process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 12) ??
  process.env.VERCEL_DEPLOYMENT_ID?.slice(0, 12) ??
  "dev";

type DayPhotoAsset = { path: string; version: string };
type DayPhotoEntry = { preview: string; gallery: DayPhotoAsset[] };
type DayPhotoManifest = { build: string; days: Record<string, DayPhotoEntry> };

function fileVersion(filePath: string): string {
  const hash = crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex").slice(0, 12);
  return `${hash}-${DAY_PHOTO_BUILD_ID}`;
}

function listGalleryImages(dayDir: string): DayPhotoAsset[] {
  if (!fs.existsSync(dayDir)) return [];
  return fs
    .readdirSync(dayDir)
    .filter((name) => /\.jpe?g$/i.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((name) => {
      const filePath = path.join(dayDir, name);
      const day = path.basename(dayDir);
      return { path: `${day}/${name}`, version: fileVersion(filePath) };
    });
}

function buildDayPhotoManifest(): DayPhotoManifest {
  const days: Record<string, DayPhotoEntry> = {};
  if (!fs.existsSync(DAYS_DIR)) return { build: DAY_PHOTO_BUILD_ID, days };

  for (const name of fs.readdirSync(DAYS_DIR)) {
    const previewMatch = /^day_(\d+)\.jpg$/i.exec(name);
    if (!previewMatch) continue;

    const day = previewMatch[1];
    const previewPath = path.join(DAYS_DIR, name);
    const galleryDir = path.join(DAYS_DIR, `day_${day}`);
    const fullPath = path.join(DAYS_DIR, `day_${day}_full.jpg`);

    let gallery = listGalleryImages(galleryDir);
    if (gallery.length === 0 && fs.existsSync(fullPath)) {
      gallery = [{ path: `day_${day}_full.jpg`, version: fileVersion(fullPath) }];
    }
    if (gallery.length === 0) {
      gallery = [{ path: name, version: fileVersion(previewPath) }];
    }

    days[day] = { preview: fileVersion(previewPath), gallery };
  }

  return { build: DAY_PHOTO_BUILD_ID, days };
}

function vitePluginDayPhotoCache(): Plugin {
  const apply = (
    req: { url?: string },
    res: { setHeader: (k: string, v: string) => void; statusCode: number; end: (body?: string) => void },
    next: () => void,
  ) => {
    const url = req.url?.split("?")[0] ?? "";
    if (url === "/days/available.json") {
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.setHeader("Cache-Control", DAY_PHOTO_NO_STORE);
      res.end(JSON.stringify(buildDayPhotoManifest()));
      return;
    }
    const photo = /^\/days\/(.+\.jpe?g)$/i.exec(url);
    if (photo) {
      const filePath = path.join(DAYS_DIR, photo[1]);
      if (fs.existsSync(filePath) && !fs.statSync(filePath).isDirectory()) {
        res.setHeader("Cache-Control", DAY_PHOTO_CACHE);
        next();
        return;
      }
      res.setHeader("Cache-Control", DAY_PHOTO_NO_STORE);
      res.statusCode = 404;
      res.end();
      return;
    }
    next();
  };

  return {
    name: "day-photo-cache",
    configureServer(server) {
      server.middlewares.use(apply);
    },
    configurePreviewServer(server) {
      server.middlewares.use(apply);
    },
    closeBundle() {
      const outDir = path.join(PROJECT_ROOT, "dist/public/days");
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, "available.json"), JSON.stringify(buildDayPhotoManifest()));
    },
  };
}

const plugins = [react(), tailwindcss(), jsxLocPlugin(), vitePluginManusRuntime(), vitePluginManusDebugCollector(), vitePluginDayPhotoCache()];

export default defineConfig({
  plugins,
  define: {
    "import.meta.env.VITE_DAY_PHOTO_BUILD": JSON.stringify(DAY_PHOTO_BUILD_ID),
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false, // Will find next available port if 3000 is busy
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
