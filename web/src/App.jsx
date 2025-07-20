import {
  useState,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import {
  Drawer,
  Stack,
  FocusTrap,
  Divider,
  Box,
  LoadingOverlay,
} from '@mantine/core';

import { useNuiEvent } from './utils/useNuiEvent';
import { fetchNui } from './utils/fetchNui';
import {
  mockConfig,
  mockPlayers,
  mockDroppedPlayers,
  mockSocieties,
} from './utils/misc';

import Header from './Header';
import Footer from './Footer';
import List from './List';

const DEFAULT_LOCALE = {
  ui_tab_players: 'Players',
  ui_tab_players_disconnected: 'Disconnected players',
  ui_tab_societies: 'Societies',
  ui_tab_filter_players: 'Filter by name or server id',
  ui_tab_filter_societies: "Filter by company’s name or it’s initials",
};

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
    locale = DEFAULT_LOCALE,
    robberies = {},
    drawerProps = {},
  } = config ?? {};


  const memoizedLocale = useMemo(() => locale, [locale]);
  const memoizedDrawerProps = useMemo(() => drawerProps, [drawerProps]);
  const memoizedOverlayProps = useMemo(() => overlayProps, [overlayProps]);
  const totalPlayerCount = useMemo(() => players.length, [players]);

  const handleToggle = useCallback((force) => {
    setScoreboardOpened((prev) => (force === undefined ? !prev : !!force));
  }, []);

  useNuiEvent('scoreboard:toggle', handleToggle);

  useNuiEvent('scoreboard:update', ({ players }) => {
    if (players) {
      setPlayers(
        Object.entries(players).map(([serverId, data]) => ({
          serverId,
          ...data,
        }))
      );
    }
  });

  useEffect(() => {
    fetchNui('scoreboard:toggled', scoreboardOpened)
      .then((data) => {
        if (data?.players) {
          setPlayers(
            Object.entries(data.players).map(([serverId, data]) => ({
              serverId,
              ...data,
            }))
          );
        }
      })
      .catch((error) => console.error('Failed to fetch players:', error))
      .finally(() => setLoading(false));
  }, [scoreboardOpened]);

  useEffect(() => {
    fetchNui('scoreboard:loaded', null, mockConfig)
      .then((config) => setConfig(config || {}))
      .catch((error) => console.error('Failed to load config:', error))
      .finally(() => setLoading(false));
  }, []);

  const displayedPlayers = useMemo(() => {
    return tab === 'tab_players' ? players : mockDroppedPlayers;
  }, [tab, players]);

  const CURRENT_PLAYER_LIST = useMemo(() => {
    if (!filter) return displayedPlayers;
    const lowerFilter = filter.toLowerCase();
    return displayedPlayers.filter(
      (player) =>
        player.name?.toLowerCase().includes(lowerFilter) ||
        player.serverId.toString().includes(lowerFilter) ||
        player.tags?.some((tag) =>
          tag.label.toLowerCase().includes(lowerFilter)
        )
    );
  }, [filter, displayedPlayers]);

  const handleTabChange = useCallback((value) => setTab(value), []);
  const handleFilterChange = useCallback((value) => setFilter(value), []);
  const handleFilterClear = useCallback(() => setFilter(''), []);

  return (
    <Drawer.Root
      closeOnClickOutside={false}
      opened={scoreboardOpened}
      onClose={() => setScoreboardOpened(false)}
      keepMounted={false}
      size="25%"
      {...memoizedDrawerProps}
    >
      {withOverlay && <Drawer.Overlay {...memoizedOverlayProps} />}
      <Drawer.Content miw="400px">
        <FocusTrap.InitialFocus />
        <Stack style={{ height: '100%', overflow: 'hidden' }} gap={0}>
          <Header
            filterDisabled={loading}
            filter={filter}
            onFilterChange={handleFilterChange}
            onFilterClear={handleFilterClear}
            tab={tab}
            onTabChange={handleTabChange}
            locale={memoizedLocale}
          />
          <Divider mb="auto" />
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
            <List
              tab={tab}
              players={CURRENT_PLAYER_LIST}
              societies={mockSocieties}
              loading={loading}
              filter={filter}
            />
          </Box>
          <Divider mt="auto" />
          <Footer
            playerServerId={playerServerId}
            playerListCount={totalPlayerCount}
            maxPlayersCount={maxPlayersCount}
            locale={memoizedLocale}
            robberies={robberies}
          />
        </Stack>
      </Drawer.Content>
    </Drawer.Root>
  );
};

export default App;
