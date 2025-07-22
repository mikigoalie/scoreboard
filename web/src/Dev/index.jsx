import { useCallback, useEffect, useState } from "react";
import { emulateGameEvent } from "../utils/misc";
import { Paper, Text, Group, Button, Kbd, Stack } from "@mantine/core";
import { mockPlayers } from "../utils/misc";

const Dev = () => {
  const [opened, setOpened] = useState(false);
  const handleKeyDown = useCallback(event => {
    const target = event.target;
    const isInput = ['INPUT'].includes(target.tagName) || target.isContentEditable;
    if (isInput) return;
    if (event.key !== "Tab") return;
    setOpened(!opened);
    emulateGameEvent({ action: opened ? "scoreboard:hide" : "scoreboard:display"})
  }, [opened]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return <Paper
    pos="fixed"
    top={20}
    left="50%"
    withBorder
    p="md"
    shadow="xl"
    style={{ zIndex: 300, transform: "translateX(-50%)" }}
  >
    {opened ? <Group>
      <Button variant="default" onClick={() => emulateGameEvent({
        action: "scoreboard:update", data: {
          players: mockPlayers
        }
      })}>Add players</Button>
      <Button variant="default">Add groups</Button>
      <Button variant="default" onClick={() => emulateGameEvent({ action: "scoreboard:update", data: { forceClear: true} })}>Clear data</Button>
    </Group> : <Stack>

      <Text>Press <Kbd>TAB</Kbd> to open scoreboard</Text>
    </Stack>}
  </Paper>
};

export default Dev;
