import { useState, useMemo, useEffect } from 'react';
import { Drawer, Stack, FocusTrap, Divider, Box, LoadingOverlay } from '@mantine/core';
import { useNuiEvent } from './utils/useNuiEvent';
import { fetchNui } from './utils/fetchNui';
import { useClickOutside } from '@mantine/hooks';
import { mockConfig, mockPlayers, mockDroppedPlayers, mockSocieties } from './utils/misc';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import PlayerList from './PlayerList';
import SocietyList from './SocietyList';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('tab_players');
  const [filter, setFilter] = useState('');
  const [config, setConfig] = useState({});
  const [players, setPlayers] = useState(mockPlayers);
  const [scoreboardOpened, setScoreboardOpened] = useState(false);

  const {
    maxPlayersCount = 0,
    playerServerId = 0,
    withOverlay = false,
    overlayProps = {},
    locale = {},
    robberies = {},
    drawerProps = {},
  } = config || {};

  useNuiEvent("scoreboard:toggle", (force) =>
    setScoreboardOpened((prev) => (force === undefined ? !prev : !!force))
  );

  useEffect(() => {
    fetchNui('scoreboard:toggled', scoreboardOpened)
      .then((data) => console.log('DATA ON TOGGLE', JSON.stringify(data, null, 2)));
  }, [scoreboardOpened]);

  useEffect(() => {
    fetchNui('scoreboard:loaded', null, mockConfig)
      .then((config) => {
        setConfig((prev) => ({ ...prev, ...config }));
      })
      .catch(console.error);
  }, []);

  // Randomize ping values every 2 seconds
/*   useEffect(() => {
    const interval = setInterval(() => {
      setPlayers((prev) =>
        prev.map((player) => ({
          ...player,
          ping: Math.floor(Math.random() * 200) + 1, // ping from 1 to 100
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []); */

  const displayedPlayers = useMemo(() => (tab === 'tab_players' ? players : mockDroppedPlayers), [tab, players]);
  const societies = useMemo(() => mockSocieties, []);

  const CURRENT_PLAYER_LIST = useMemo(() => {
    return filter
      ? displayedPlayers.filter((player) =>
          player.name.toLowerCase().includes(filter.toLowerCase()) ||
          player.serverId.toString().includes(filter) ||
          player.tags.some((tag) => tag.label.toLowerCase().includes(filter.toLowerCase()))
        )
      : displayedPlayers;
  }, [filter, displayedPlayers]);

  const playerListCount = useMemo(() => displayedPlayers.length, [displayedPlayers]);

  return (
    <Drawer.Root
      closeOnClickOutside={false}
      opened={scoreboardOpened}
      onClose={() => setScoreboardOpened(false)}
      keepMounted={false}
      size="25%"
      {...drawerProps}
    >
      {withOverlay && <Drawer.Overlay props={overlayProps} />}
      <Drawer.Content miw="400px" >
        <FocusTrap.InitialFocus />
        <Stack gap={0} style={{ height: '100%', overflow: 'hidden' }}>
          <Header
            filter={filter}
            setFilter={setFilter}
            tab={tab}
            setTab={setTab}
            locale={locale}
          />
          <Divider mb="auto" />
          <Box flex={1} bg="dark.9" pos="relative" h="100%" p={2} pr={0} pb={0}>
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            {tab === 'tab_jobs'
              ? <SocietyList societies={societies} />
              : <PlayerList players={CURRENT_PLAYER_LIST} filter={filter} />}
          </Box>
          <Divider mt="auto" />
          <Footer
            playerServerId={playerServerId}
            playerListCount={playerListCount}
            maxPlayersCount={maxPlayersCount}
            locale={locale}
            robberies={robberies}
          />
        </Stack>
      </Drawer.Content>
    </Drawer.Root>
  );
};

export default App;
