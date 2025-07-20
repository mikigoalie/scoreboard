import { useMemo } from 'react';
import { Virtuoso } from 'react-virtuoso';
import EmptyState from './EmptyState';
import PlayerComponent from './PlayerComponent';

const PlayerList = ({ players = [], filter }) => {
  if (!players.length) {
    return <EmptyState filter={filter} />;
  }

  return (
    <Virtuoso
      data={players}
      style={{ flex: 1, height: '100%', overflow: 'auto' }}
      initialItemCount={players.length > 15 ? 15 : players.length} // Couldn't find a better way to prevent flickering on initial render.
      itemContent={(index, player) => (
        <PlayerComponent key={player.serverId} id={player.serverId} data={player} />
      )}
      components={{
        Item: ({ children, ...props }) => (
          <div {...props} style={{ paddingBottom: 2 }}>
            {children}
          </div>
        ),
      }}
    />
  );
};


export default PlayerList;
