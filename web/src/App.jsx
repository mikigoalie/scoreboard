import React, { useState, useReducer, useEffect, useMemo } from 'react';
import {
  Drawer,
  Stack,
  Divider,
  Paper,
  Tabs,
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
  const { hideContextMenu, isContextMenuVisible } = useContextMenu();
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

  // Nui events
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

  useNuiEvent(
    'scoreboard:update',
    ({ forceClear = false, players = {}, groups = {}, droppedPlayers = {} }) => {
      if (forceClear) {
        dispatch({ type: 'clear' });
        return;
      }
      dispatch({ type: 'update', players, groups, droppedPlayers });
    }
  );

  useNuiEvent('scoreboard:updatecfg', (data) => {
    setConfig((prev) => ({
      ...prev,
      ...data,
      locale: { ...prev.locale, ...data.locale },
    }));
  });

  useEffect(() => {
    fetchNui('scoreboard:toggled', scoreboardOpened);
    if (!scoreboardOpened && isContextMenuVisible) {
      hideContextMenu();
    }
  }, [scoreboardOpened, isContextMenuVisible, hideContextMenu]);

  useEffect(() => {
    fetchNui('scoreboard:loaded', null, mockConfig).then((config) =>
      setConfig(config || DEFAULT_CONFIG)
    );
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
      <Drawer.Content radius={drawerProps?.radius ?? 0}>
        <Paper
        radius={drawerProps?.radius ?? 0}
          withBorder
          style={{
            height: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Stack gap={0} style={{ flex: 1 }}>
            <Header
              filter={filter}
              onFilterChange={setFilter}
              onFilterClear={() => setFilter('')}
              tab={tab}
              onTabChange={setTab}
              locale={locale}
            />

            <Divider mb="auto" />

            <Tabs
              value={tab}
              onChange={setTab}
              keepMounted={true}
              style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            >
              <Tabs.Panel
                value="tab_players"
                style={{ flex: 1, overflow: 'auto' }}
              >
                <Playerlist filter={filter} data={players} />
              </Tabs.Panel>

              <Tabs.Panel
                value="ui_tab_players_disconnected"
                style={{ flex: 1, overflow: 'auto' }}
              >
                <DroppedPlayerList filter={filter} data={players} />
              </Tabs.Panel>

              <Tabs.Panel
                value="ui_tab_societies"
                style={{ flex: 1, overflow: 'auto' }}
              >
                <GroupList filter={filter} data={groups} />
              </Tabs.Panel>
            </Tabs>

            <Divider mt="auto" />

            <Footer
              playerServerId={playerServerId}
              playerListCount={totalPlayerCount}
              maxPlayersCount={maxPlayersCount}
              locale={locale}
            />
          </Stack>
        </Paper>
      </Drawer.Content>
    </Drawer.Root>
  );
};

export default App;