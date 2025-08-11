import React, {
  useState,
  useReducer,
  useEffect,
  useMemo,
} from 'react';
import {
  Drawer,
  Stack,
  Box,
} from '@mantine/core';
import { useNuiEvent } from './utils/useNuiEvent';
import { fetchNui } from './utils/fetchNui';
import { mockConfig } from './utils/misc';
import Header from './Header';
import Footer from './Footer';
import Playerlist from './Lists/Playerlist';
import GroupList from './Lists/GroupList';

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
};

const initialState = {
  players: new Map(),
  groups: new Map(),
  droppedPlayers: new Map(),
};

function reducer(state, action) {
  switch (action.type) {
    case 'update':
      return {
        players: new Map(Object.entries(action.players || {})),
        groups: new Map(Object.entries(action.groups || {})),
        droppedPlayers: new Map(Object.entries(action.droppedPlayers || {})),
      };
    case 'clear':
      return initialState;
    default:
      return state;
  }
}

const containerStyle = {
  flex: 1,
  backgroundColor: 'var(--mantine-color-dark-9)',
  position: 'relative',
  height: '100%',
  padding: '2px 0 0 2px',
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { players, groups } = state;
  const [tab, setTab] = useState('tab_players');
  const [filter, setFilter] = useState('');
  const [config, setConfig] = useState(() => DEFAULT_CONFIG);
  const [scoreboardOpened, setScoreboardOpened] = useState(false);

  const {
    maxPlayersCount,
    playerServerId,
    withOverlay,
    overlayProps,
    locale,
    drawerProps,
  } = config;

  const totalPlayerCount = useMemo(() => players.size, [players]);

  // Filtered players inline helper
  const filteredPlayers = useMemo(() => {
    if (!filter) return players;
    const lowerFilter = filter.toLowerCase();
    return new Map(
      [...players].filter(([, player]) =>
        player.name?.toLowerCase().includes(lowerFilter) ||
        String(player.serverId)?.includes(lowerFilter)
      )
    );
  }, [players, filter]);

  // Filtered groups inline helper
  const filteredGroups = useMemo(() => {
    if (!filter) return groups;
    const lowerFilter = filter.toLowerCase();
    return new Map(
      [...groups].filter(([, group]) =>
        group.name?.toLowerCase().includes(lowerFilter) ||
        group.initials?.toLowerCase().includes(lowerFilter)
      )
    );
  }, [groups, filter]);

  useNuiEvent('scoreboard:display', (data) => {
    if (!data) {
      setScoreboardOpened(true);
      return;
    }
    const { players = {}, groups = {}, droppedPlayers = {} } = data;
    dispatch({ type: 'update', players, groups, droppedPlayers });
    setScoreboardOpened(true);
  });

  useNuiEvent('scoreboard:hide', () => setScoreboardOpened(false));

  useNuiEvent('scoreboard:update', ({ forceClear = false, players = {}, groups = {}, droppedPlayers = {} }) => {
    if (forceClear) {
      dispatch({ type: 'clear' });
      return;
    }
    dispatch({ type: 'update', players, groups, droppedPlayers });
  });

  useNuiEvent('scoreboard:updatecfg', (data) => {
    setConfig(prev => ({
      ...prev,
      ...data,
      locale: { ...prev.locale, ...data.locale },
    }));
  });

  useEffect(() => {
    fetchNui('scoreboard:toggled', scoreboardOpened);
  }, [scoreboardOpened]);

  useEffect(() => {
    fetchNui('scoreboard:loaded', null, mockConfig).then(config => setConfig(config || DEFAULT_CONFIG));
  }, []);


  return (
    <Drawer.Root
      closeOnClickOutside={false}
      opened={scoreboardOpened}
      onClose={() => setScoreboardOpened(false)}
      keepMounted={false}
      size="25%"
      {...drawerProps}
    >
      {withOverlay && <Drawer.Overlay {...overlayProps} />}
      <Drawer.Content miw="400px">
        <Stack style={{ height: '100%', overflow: 'hidden' }} gap={0}>
          <Header
            filter={filter}
            onFilterChange={setFilter}
            onFilterClear={() => setFilter('')}
            tab={tab}
            onTabChange={setTab}
            locale={locale}
          />

          <Box style={containerStyle}>
            <Box style={{ height: '100%' }}>
              <Box
                style={{
                  display: tab === 'tab_players' ? 'block' : 'none',
                  height: '100%',
                }}
              >
                <Playerlist filter={filter} data={filteredPlayers} />
              </Box>
              <Box
                style={{
                  display: tab === 'tab_jobs' ? 'block' : 'none',
                  height: '100%',
                }}
              >
                <GroupList filter={filter} data={filteredGroups} />
              </Box>
            </Box>
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
