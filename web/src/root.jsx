import '@mantine/core/styles.layer.css';
import 'mantine-contextmenu/styles.layer.css';
import "./index.css";
import { MantineProvider, createTheme, ActionIcon } from "@mantine/core";
import { ContextMenuProvider } from "mantine-contextmenu";
import App from "./App.jsx";
import Dev from "./Dev";
import { isEnvBrowser } from "./utils/misc";

const theme = createTheme({
    primaryColor: "blue",
    focusRing: "never",
    colors: {
        dark: ["#C1C2C5", "#A6A7AB", "#909296", "#5C5F66", "#373A40", "#2C2E33", "#25262B", "#1A1B1E", "#141517", "#09090b"]
    },
    components: {
        ActionIcon: ActionIcon.extend({
            styles: {
                root: { transition: "background-color 500ms ease, color 500ms ease" },
            },
        }),
    },
});
const isBrowser = isEnvBrowser();

const RootLayout = () => {
    return (
        <MantineProvider defaultColorScheme="dark" theme={theme}>
            <ContextMenuProvider>
                {isBrowser && <Dev />}
                <App />
            </ContextMenuProvider>
        </MantineProvider>
    );
};

export default RootLayout;