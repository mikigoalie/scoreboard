import { useCallback, useEffect } from "react";
import { emulateGameEvent } from "../utils/misc";

const Index = () => {
  const handleKeyPress = useCallback((e) => {
    if (e.key !== "Tab") return;
    emulateGameEvent({ action: "scoreboard:toggle" });
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // ✅ Must return something (even null) to be a valid React component
  return null;
};

export default Index;
