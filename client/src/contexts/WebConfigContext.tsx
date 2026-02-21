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
        // Force refresh by appending timestamp to bypass browser cache
        fetch(`/WebConfig.json?t=${Date.now()}`)
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
