import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "@/hooks/useInView";
import { ALL_STOPS } from "@/lib/tripData";
import { useWebConfig } from "../contexts/WebConfigContext";
import { getCurrentStop } from "@/lib/tripDates";

gsap.registerPlugin(ScrollTrigger);

// Convert lat/lng to SVG coordinates (simplified projection for India)
function toSVG(lat: number, lng: number): { x: number; y: number } {
  const minLat = 7, maxLat = 36;
  const minLng = 68, maxLng = 90;
  const svgW = 500, svgH = 600;
  const padding = 40;

  const x = padding + ((lng - minLng) / (maxLng - minLng)) * (svgW - 2 * padding);
  const y = padding + ((maxLat - lat) / (maxLat - minLat)) * (svgH - 2 * padding);
  return { x, y };
}

// Deduplicate stops by place name for the map
const uniqueStops = ALL_STOPS.filter(
  (stop, idx, arr) => arr.findIndex((s) => s.place === stop.place) === idx
);

// Build the route path — close the loop back to Delhi
const pathPoints = uniqueStops.map((s) => toSVG(s.lat, s.lng));
// Append the first point (Delhi) to close the circuit
pathPoints.push(pathPoints[0]);

const pathD = pathPoints
  .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
  .join(" ");

// Key cities to label
const labeledCities = ["Delhi", "Srinagar", "Bikaner", "Goa", "Kanyakumari", "Chennai", "Kolkata", "Varanasi"];

export default function RouteMap() {
  const { ref: sectionRef, isInView } = useInView(0.1);
  const pathRef = useRef<SVGPathElement>(null);
  const shadowPathRef = useRef<SVGPathElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const { tripStartDate } = useWebConfig();
  const currentStop = getCurrentStop(tripStartDate);

  useEffect(() => {
    if (!pathRef.current || !pinWrapperRef.current) return;
    const path = pathRef.current;
    const length = path.getTotalLength();

    // Set initial state — fully hidden
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: pinWrapperRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });

    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);
    window.addEventListener("load", refresh);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", refresh);
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div ref={pinWrapperRef} className="relative z-0">
      <section
        id="route"
        ref={sectionRef}
        className="relative min-h-screen overflow-hidden flex flex-col justify-center"
        style={{ backgroundColor: "#0A0A0A" }}
      >
        {/* Background grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,184,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,184,0,0.5) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
          {/* Header */}
          <div className={`text-center mb-8 sm:mb-12 transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-[2px] bg-[#FFB800]" />
              <span className="font-mono-custom text-xs text-[#FFB800] tracking-[0.2em] uppercase">
                The Route
              </span>
              <div className="w-10 h-[2px] bg-[#FFB800]" />
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white mb-3">
              8,000+ Kilometers
            </h2>
            <p className="font-body text-sm sm:text-base text-white/50 max-w-xl mx-auto">
              A massive clockwise loop around India — from the Himalayas to the Indian Ocean and back.
            </p>
          </div>

          {/* SVG Map + Stats side by side on large screens */}
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* SVG Map */}
            <div className={`relative flex-1 max-w-md mx-auto lg:mx-0 w-full transition-all duration-1000 ${isInView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
              <svg
                viewBox="0 0 500 600"
                className="w-full h-auto"
                style={{ filter: "drop-shadow(0 0 20px rgba(255,184,0,0.1))" }}
              >
                {/* Route shadow path (full loop visible as ghost) */}
                <path
                  ref={shadowPathRef}
                  d={pathD}
                  fill="none"
                  stroke="#FFB800"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.1"
                />

                {/* Route Path (scroll-animated) */}
                <path
                  ref={pathRef}
                  d={pathD}
                  fill="none"
                  stroke="#FFB800"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* City Dots & Labels */}
                {uniqueStops.map((stop, idx) => {
                  const { x, y } = toSVG(stop.lat, stop.lng);
                  const isCurrent = currentStop?.place === stop.place;
                  const showLabel = labeledCities.includes(stop.place) || isCurrent;
                  const isStart = stop.place === "Delhi" && stop.day === 1;
                  const isEnd = stop.place === "Kanyakumari";

                  return (
                    <g
                      key={`${stop.day}-${stop.place}`}
                      style={{
                        opacity: isInView ? 1 : 0,
                        transition: `opacity 0.4s ease ${0.5 + idx * 0.06}s`,
                        transformOrigin: `${x}px ${y}px`,
                      }}
                    >
                      {(isStart || isEnd || isCurrent) && (
                        <circle cx={x} cy={y} r="12" fill={isCurrent ? "#FFB800" : isStart ? "#FFB800" : "#E94560"} opacity="0.15" />
                      )}
                      {isCurrent && (
                        <circle cx={x} cy={y} r="10" fill="none" stroke="#FFB800" strokeWidth="1.5" opacity="0.7">
                          <animate attributeName="r" values="7;14;7" dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
                        </circle>
                      )}
                      <circle
                        cx={x}
                        cy={y}
                        r={isCurrent || isStart || isEnd ? 5 : 3}
                        fill={isCurrent ? "#FFB800" : isStart ? "#FFB800" : isEnd ? "#E94560" : "#FFB800"}
                        stroke={isCurrent || isStart || isEnd ? "#fff" : "none"}
                        strokeWidth={isCurrent || isStart || isEnd ? 1.5 : 0}
                      />
                      {showLabel && (
                        <text
                          x={x + (x > 300 ? -8 : 8)}
                          y={y + (y > 300 ? -8 : 4)}
                          textAnchor={x > 300 ? "end" : "start"}
                          className="font-mono-custom"
                          fill={isCurrent ? "#FFB800" : "rgba(255,255,255,0.7)"}
                          fontSize="9"
                          fontWeight={isCurrent ? "bold" : "normal"}
                        >
                          {isCurrent ? `${stop.place} · HERE` : stop.place}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Start/End Markers */}
                <text
                  x={toSVG(28.6139, 77.209).x + 12}
                  y={toSVG(28.6139, 77.209).y - 12}
                  fill="#FFB800"
                  fontSize="10"
                  fontWeight="bold"
                  className="font-display"
                  style={{ opacity: isInView ? 1 : 0, transition: "opacity 0.6s ease 1s" }}
                >
                  START
                </text>
                <text
                  x={toSVG(8.0883, 77.5385).x + 12}
                  y={toSVG(8.0883, 77.5385).y + 16}
                  fill="#E94560"
                  fontSize="10"
                  fontWeight="bold"
                  className="font-display"
                  style={{ opacity: isInView ? 1 : 0, transition: "opacity 0.6s ease 2s" }}
                >
                  K2K
                </text>
              </svg>
            </div>

            {/* Route Stats — vertical stack on the side */}
            <div className="flex flex-row lg:flex-col gap-3 sm:gap-4 flex-wrap justify-center">
              {[
                { value: "37", label: "Travel Days", icon: "📅" },
                { value: "15+", label: "States & UTs", icon: "🗺️" },
                { value: "8K+", label: "Kilometers", icon: "🛣️" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`text-center p-3 sm:p-5 rounded-xl bg-white/[0.03] border border-white/[0.06] transition-all duration-600 min-w-[90px] lg:min-w-[140px] ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                  style={{ transitionDelay: `${1200 + i * 100}ms` }}
                >
                  <div className="text-xl sm:text-2xl mb-1">{stat.icon}</div>
                  <div className="font-counter text-xl sm:text-2xl text-[#FFB800]">{stat.value}</div>
                  <div className="font-mono-custom text-[9px] sm:text-[10px] text-white/50 uppercase tracking-wider mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
