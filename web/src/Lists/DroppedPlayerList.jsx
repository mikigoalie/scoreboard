import { memo, useMemo, useCallback } from 'react';
import { Virtuoso } from 'react-virtuoso';
import PlayerComponent from '../PlayerComponent';
import EmptyState from './EmptyState';

const DroppedPlayerList = ({ filter, data }) => {
  const playersArray = useMemo(() => [...data.values()], [data]);

  const filteredPlayers = useMemo(() => {
    if (!data.size) return playersArray;
    const lowerFilter = filter.toLowerCase();
    return playersArray.filter(player => {
      const name = player.name?.toLowerCase() || '';
      const serverId = player.serverId?.toString() || '';
      const hasMatchingTag = player.tags?.some(tag =>
        tag.label?.toLowerCase().includes(lowerFilter)
      ) || false;
      return (
        name.includes(lowerFilter) ||
        serverId.includes(lowerFilter) ||
        hasMatchingTag
      );
    });
  }, [playersArray, filter, data.size]);

  const renderPlayer = useCallback((index, item) => <PlayerComponent {...item} droppedAt={Math.floor(Date.now() / 1000) - 300}/>, []);

  return (
    <Virtuoso
      style={{ overflow: 'auto' }}
      data={filteredPlayers}
      itemKey={(index, player) => player.serverId}
      components={{
        EmptyPlaceholder: () => <EmptyState filter={filter} />,
        Item: ({ children, ...props }) => (
          <div {...props}>
            {children}
          </div>
        ),
      }}
      itemContent={renderPlayer}
    />
  );
};

export default memo(DroppedPlayerList);