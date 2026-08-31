import React, { createContext, useContext, useEffect, useState } from "react";

interface WebConfig {
    tripStartDate: string;
    heroDateRange: string;
    footerDateRange: string;
}

const defaultConfig: WebConfig = {
    tripStartDate: "2026-08-28",
    heroDateRange: "August 28 — October 7, 2026",
    footerDateRange: "August — October 2026",
};

const WebConfigContext = createContext<WebConfig>(defaultConfig);

export const useWebConfig = () => useContext(WebConfigContext);

export const WebConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [config, setConfig] = useState<WebConfig>(defaultConfig);

    useEffect(() => {
        // You can set VITE_WEBCONFIG_URL in your .env file to a raw URL (e.g., GitHub Gist, JSONBin, S3)
        // If not set, it falls back to the local WebConfig.json
        const configUrl = import.meta.env.VITE_WEBCONFIG_URL || "/WebConfig.json";

        // Force refresh by appending timestamp to bypass browser cache
        const urlWithCacheBuster = configUrl.includes('?')
            ? `${configUrl}&t=${Date.now()}`
            : `${configUrl}?t=${Date.now()}`;

        fetch(urlWithCacheBuster)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to load config");
                return res.json();
            })
            .then((data) => {
                setConfig((prevConfig) => ({ ...prevConfig, ...data }));
            })
            .catch((err) => {
                console.error("Error fetching WebConfig.json:", err);
            });
    }, []);

    return (
        <WebConfigContext.Provider value={config}>
            {children}
        </WebConfigContext.Provider>
    );
};
