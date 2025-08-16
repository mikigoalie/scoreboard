import { memo, useCallback, useMemo } from 'react';
import { Box, TextInput, Input, SegmentedControl, Divider } from '@mantine/core';
import { fetchNui } from '../utils/fetchNui';
import { SearchIcon } from '../utils/icons';

const Header = ({
  filterDisabled,
  filter,
  onFilterChange,
  onFilterClear,
  tab,
  onTabChange,
  locale,
}) => {
  const onFocus = useCallback(focused => fetchNui('scoreboard:focus', focused), []);
  const filterPlaceholder = useMemo(() => tab === 'tab_players' ? locale.ui_tab_filter_players : locale.ui_tab_filter_societies, [tab, locale.ui_tab_filter_players, locale.ui_tab_filter_societies]);
  return (
    <Box p={8}>
      <SegmentedControl value={tab} onChange={onTabChange} data={[
        { label: locale.ui_tab_players, value: 'tab_players' },
        { label: locale.ui_tab_societies, value: 'ui_tab_societies' },
        /* { label: locale.ui_tab_players_disconnected, value: 'ui_tab_players_disconnected' }, */
        
      ]} fullWidth mb={8} />

      <TextInput
        disabled={filterDisabled}
        value={filter}
        onChange={(event) => onFilterChange(event.target.value)}
        placeholder={filterPlaceholder}
        rightSection={
          filter !== '' ? (
            <Input.ClearButton
              disabled={filterDisabled}
              onClick={onFilterClear}
            />
          ) : (
            <SearchIcon />
          )
        }
        rightSectionPointerEvents="auto"
        onFocus={() => onFocus(true)}
        onBlur={() => onFocus(false)}
      />
    </Box>

  );


}

export default memo(Header);