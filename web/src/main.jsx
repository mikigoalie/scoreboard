import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { isEnvBrowser } from "./utils/misc";
import RootLayout from "./root.jsx";

const isBrowser = isEnvBrowser();
const root = document.getElementById("root");

if (isBrowser) {
  const script = document.createElement("script");
  script.src = "//unpkg.com/react-scan/dist/auto.global.js";
  script.crossOrigin = "anonymous";
  document.head.appendChild(script);

  root.style.height = "100vh";
  root.style.backgroundImage = "url('/bg.jpg')";
  root.style.backgroundSize = "cover";
  root.style.backgroundRepeat = "no-repeat";
  root.style.backgroundPosition = "center";
}

createRoot(root).render(
  <StrictMode>
    <RootLayout />
  </StrictMode>
);