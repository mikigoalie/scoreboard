import "./index.css";
import "@mantine/core/styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider, createTheme, ActionIcon, Input, Select, defaultVariantColorsResolver } from "@mantine/core";;
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



const resolver = (theme) => ({
  variables: { "--mantine-color-ofblue": theme.other.ofblue },
  light: { "--mantine-color-error": theme.colors.red[6] },
  dark: { "--mantine-color-error": theme.colors.red[5] },
});

const theme = createTheme({
  variantColorResolver: (input) => {
    const defaultResolvedColors = defaultVariantColorsResolver(input);
    return defaultResolvedColors;
  },
  //focusRing: "never",
  //colors: { dark: ["#c9c9c9", "#b3b3b3", "#9b9ba1", "#7f7f87", "#62626c", "#4a4a53", "#383843", "#2a2a34", "#1a1a22", "#0f0f14"] },
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
