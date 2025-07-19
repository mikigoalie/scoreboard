import { use, useMemo } from 'react';
import { Box, Center, Divider, Text } from '@mantine/core';
import { Virtuoso } from 'react-virtuoso';
import EmptyState from './EmptyState';
import PlayerListC from './PlayerList';


const PlayerList = ({ players = [], filter }) => {
  const renderBody = useMemo(() => {
    if (!players || players.length === 0) {
      return <EmptyState filter={filter} />;
    } else {
      return <PlayerListC players={players} />;
    }
  }, [players, filter]);

  return (
    <>
     {renderBody}
    </>
       
  );
};

export default PlayerList;
