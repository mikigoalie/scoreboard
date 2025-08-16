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
  Divider
} from '@mantine/core';
import { useNuiEvent } from './utils/useNuiEvent';
import { fetchNui } from './utils/fetchNui';
import { mockConfig } from './utils/misc';
import Header from './Header';
import Footer from './Footer';
import Playerlist from './Lists/Playerlist';
import GroupList from './Lists/GroupList';
import DroppedPlayerList from './Lists/DroppedPlayerList';
import { useContextMenu } from 'mantine-contextmenu';

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

const App = () => {
  const { hideContextMenu, isContextMenuVisible } = useContextMenu()
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
    if (!scoreboardOpened && isContextMenuVisible) {
      hideContextMenu()
    }
  }, [scoreboardOpened, isContextMenuVisible, hideContextMenu]);

  useEffect(() => {
    fetchNui('scoreboard:loaded', null, mockConfig).then(config => setConfig(config || DEFAULT_CONFIG));
  }, []);

  return (
    <Drawer.Root
      {...drawerProps}
      closeOnClickOutside={false}
      opened={scoreboardOpened}
      onClose={() => setScoreboardOpened(false)}
      size="clamp(300px, 30vw, 450px)"
      keepMounted={false}
    >
      {withOverlay && <Drawer.Overlay {...overlayProps} />}
      <Drawer.Content>
        <Stack style={{ height: '100%', overflow: 'hidden' }} gap={0}>
          <Header
            filter={filter}
            onFilterChange={setFilter}
            onFilterClear={() => setFilter('')}
            tab={tab}
            onTabChange={setTab}
            locale={locale}
          />
          <Divider mb="auto" />
          <Box className="scoreboard-body">
            <Box
              style={{
                display: tab === 'tab_players' ? 'block' : 'none',
                height: '100%',
              }}
            >
              <Playerlist filter={filter} data={players} />
            </Box>
            <Box
              style={{
                display: tab === 'ui_tab_players_disconnected' ? 'block' : 'none',
                height: '100%',
              }}
            >
              <DroppedPlayerList filter={filter} data={players} />
            </Box>
            <Box
              style={{
                display: tab === 'ui_tab_societies' ? 'block' : 'none',
                height: '100%',
              }}
            >
              <GroupList filter={filter} data={groups} />
            </Box>
          </Box>

          <Divider mt="auto" />
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
