import { createRoot } from "react-dom/client";
import { WebConfigProvider } from "./contexts/WebConfigContext";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <WebConfigProvider>
        <App />
    </WebConfigProvider>
);
