import React, { createContext, useContext, useEffect, useState } from "react";

interface WebConfig {
    tripStartDate: string;
    heroDateRange: string;
    preTripDate: string;
    journeyDate: string;
    postTripDate: string;
    footerDateRange: string;
    enableSupportJourney: boolean;
}

const defaultConfig: WebConfig = {
    tripStartDate: "2026-03-23",
    heroDateRange: "March 23 — May 2, 2026",
    preTripDate: "Feb — Mar 2026",
    journeyDate: "Mar 23 — Apr 28",
    postTripDate: "May 2026+",
    footerDateRange: "March — May 2026",
    enableSupportJourney: true,
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
