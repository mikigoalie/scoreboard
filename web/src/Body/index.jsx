import { use, useMemo } from 'react';
import { Box, Center, Divider, Text } from '@mantine/core';
import { Virtuoso } from 'react-virtuoso';
import EmptyState from '../PlayerList/EmptyState';
import PlayerList from '../PlayerList/PlayerList';


const index = ({ players = [], filter }) => {
  const renderBody = useMemo(() => {
    if (!players || players.length === 0) {
      return <EmptyState filter={filter} />;
    } else {
      return <PlayerList players={players} />;
    }
  }, [players, filter]);

  return (
    <Box flex={1}>
      <Divider />
      <Box flex={1} h="100%" >
        {renderBody}
      </Box>

      <Divider mt={2} />
    </Box>
  );
};

export default index;
