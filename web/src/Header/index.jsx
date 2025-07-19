import { useCallback, useMemo } from 'react';
import { Box, TextInput, Input, SegmentedControl } from '@mantine/core';
import { fetchNui } from '../utils/fetchNui';
import { SearchIcon } from '../utils/icons';

const Header = ({ filterDisabled, filter, setFilter, tab, setTab, locale = {
  ui_tab_players: "Players",
  ui_tab_players_disconnected: "Disconnected players",
  ui_tab_societies: "Societies",
  ui_tab_filter_players: 'Filter by name or server id',
  ui_tab_filter_societies: 'Filter by company\'s name or it\'s initials',
} }) => {
  const onFocus = useCallback(focused => fetchNui('scoreboard:focus', focused), []);
  const filterPlaceholder = useMemo(() =>tab === 'tab_players' ? locale.ui_tab_filter_players : locale.ui_tab_filter_societies, [tab, locale.ui_tab_filter_players, locale.ui_tab_filter_societies]);
  return (
    <Box p={8}>
      <SegmentedControl value={tab} onChange={setTab} bg="dark.9" data={[
        { label: locale.ui_tab_players, value: 'tab_players' },
        { label: locale.ui_tab_societies, value: 'tab_jobs' },
      ]} fullWidth mb={8} />

      <TextInput
        disabled={filterDisabled}
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
        placeholder={filterPlaceholder}
        rightSection={filter !== '' ? <Input.ClearButton disabled={filterDisabled} onClick={() => setFilter('')} /> : <SearchIcon />}
        rightSectionPointerEvents="auto"
        onFocus={() => onFocus(true)}
        onBlur={() => onFocus(false)}
      />

    </Box>
  );


}

export default Header;