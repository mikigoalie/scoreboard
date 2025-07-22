import {
  useState,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import {
  Drawer,
  Stack,
  Divider,
  Box,
  LoadingOverlay,
} from '@mantine/core';
import { useNuiEvent } from './utils/useNuiEvent';
import { fetchNui } from './utils/fetchNui';
import { mockConfig } from './utils/misc';
import Header from './Header';
import Footer from './Footer';
import Playerlist from './Lists/Playerlist';
import GroupList from './Lists/GroupList';
import DisconnectedPlayerlist from './Lists/DisconnectedPlayerlist';

const DEFAULT_LOCALE = {
  ui_tab_players: 'Players',
  ui_tab_players_disconnected: 'Disconnected players',
  ui_tab_societies: 'Societies',
  ui_tab_filter_players: 'Filter by name or server id',
  ui_tab_filter_societies: "Filter by company’s name or it’s initials",
};

const DEFAULT_CONFIG = {
  maxPlayersCount: 0,
  playerServerId: 0,
  withOverlay: false,
  overlayProps: {},
  locale: DEFAULT_LOCALE,
  drawerProps: {},
}

const App = () => {
  const [players, setPlayers] = useState(new Map());
  const [groups, setGroups] = useState(new Map());
  const [droppedPlayers, setDroppedPlayers] = useState(new Map());


  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('tab_players');
  const [filter, setFilter] = useState('');
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  const [scoreboardOpened, setScoreboardOpened] = useState(false);
  const {
    maxPlayersCount,
    playerServerId,
    withOverlay,
    overlayProps,
    locale,
    drawerProps,
  } = useMemo(() => config, [config]);

  const totalPlayerCount = useMemo(() => players.size, [players]);

  useNuiEvent('scoreboard:display', (data) => {
    if (!data) return setScoreboardOpened(true);
    const { players = {}, groups = {}, droppedPlayers = {} } = data;
    setPlayers(new Map(Object.entries(players)));
    setGroups(new Map(Object.entries(groups)));
    setDroppedPlayers(new Map(Object.entries(droppedPlayers)));
    setScoreboardOpened(true);
  });

  const handleHide = useCallback(() => setScoreboardOpened(false), []);
  useNuiEvent('scoreboard:hide', handleHide);

  // Handle scoreboard updates
  useNuiEvent('scoreboard:update', ({ forceClear = false, players = {}, groups = {}, droppedPlayers = {} }) => {
    if (forceClear) {
      setPlayers(new Map());
      setGroups(new Map());
      setDroppedPlayers(new Map());
      return;
    }

    setPlayers(new Map(Object.entries(players)));
    setGroups(new Map(Object.entries(groups)));
    setDroppedPlayers(new Map(Object.entries(droppedPlayers)));
  });


  useEffect(() => {
    fetchNui('scoreboard:toggled', scoreboardOpened)
  }, [scoreboardOpened]);


  useEffect(() => {
    fetchNui('scoreboard:loaded', null, mockConfig).then((config) => setConfig(config || {}))
  }, []);

  const handleTabChange = useCallback((value) => setTab(value), []);
  const handleFilterChange = useCallback((value) => setFilter(value), []);
  const handleFilterClear = useCallback(() => setFilter(''), []);
  const closeScoreboard = useCallback(() => setScoreboardOpened(false), []);

  return (
    <Drawer.Root
      closeOnClickOutside={false}
      opened={scoreboardOpened}
      onClose={closeScoreboard}
      keepMounted={false}
      size="25%"
      {...drawerProps}
    >
      {withOverlay && <Drawer.Overlay {...overlayProps} />}
      <Drawer.Content miw="400px">
        <Stack style={{ height: '100%', overflow: 'hidden' }} gap={0}>
          <Header
            filterDisabled={loading}
            filter={filter}
            onFilterChange={handleFilterChange}
            onFilterClear={handleFilterClear}
            tab={tab}
            onTabChange={handleTabChange}
            locale={locale}
          />

          <Box
            style={{
              flex: 1,
              backgroundColor: 'var(--mantine-color-dark-9)',
              position: 'relative',
              height: '100%',
              padding: '2px',
              paddingRight: 0,
              paddingBottom: 0,
            }}
          >
            <LoadingOverlay visible={loading} />

            {tab == "tab_players" && <Playerlist filter={filter} data={players} />}
            {/* TBD {tab == "tab_droppedplayers" && <Playerlist filter={filter} data={players} />} */}
            {tab == "tab_jobs" && <GroupList filter={filter} data={groups} />}

          </Box>

          <Footer
            playerServerId={playerServerId}
            playerListCount={totalPlayerCount}
            maxPlayersCount={maxPlayersCount}
            locale={locale}
          />
        </Stack>
      </Drawer.Content>
    </Drawer.Root>
  );
};

export default App;