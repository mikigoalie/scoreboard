import "./index.css";
import "@mantine/core/styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider, createTheme, ActionIcon, Input, Select } from "@mantine/core";;
import { isEnvBrowser } from "./utils/misc";
import Dev from "./Dev";
import App from "./App.jsx";

const isBrowser = isEnvBrowser();
const root = document.getElementById("root");

if (isBrowser) {
  const script = document.createElement('script');
  script.src = '//unpkg.com/react-scan/dist/auto.global.js';
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
  root.style.height = "100vh";
  root.style.backgroundImage = "url(https://img.gta5-mods.com/q95/images/naturalvision-evolved-night-reshade-preset-by-squander-lobby/3778b5-1.jpg)";
  root.style.backgroundSize = "cover";
  root.style.backgroundRepeat = "no-repeat";
  root.style.backgroundPosition = "center";
}

const theme = createTheme({
  primaryColor: "blue",
  focusRing: "never",
  colors: {
    dark: ["#C1C2C5", "#A6A7AB", "#909296", "#5C5F66", "#373A40", "#2C2E33", "#25262B", "#1A1B1E", "#141517", "#101113"]
  },
  components: {
    ActionIcon: ActionIcon.extend({
      styles: {
        root: { transition: "background-color 500ms ease, color 500ms ease" },
      },
    }),
    Select: Select.extend({
      styles: {
        dropdown: { backgroundColor: "var(--mantine-color-dark-9)" },
      },
    }),
    Input: Input.extend({
      styles: {
        input: { backgroundColor: "var(--mantine-color-dark-9)" }
      },
    }),
  },
});

createRoot(root).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="dark" theme={theme} >
      {isBrowser && <Dev />}
      <App />
    </MantineProvider>
  </StrictMode>
);
