import { memo, useMemo, useDeferredValue, useCallback } from 'react';
import { Virtuoso } from 'react-virtuoso';
import PlayerComponent from '../PlayerComponent';
import EmptyState from './EmptyState';

const virtuosoStyles = { flex: 1, height: '100%', overflow: 'auto' };

const Playerlist = ({ filter, data }) => {
  const deferredFilter = useDeferredValue(filter);
  const playersArray = useMemo(() => [...data.values()], [data]);

  const filteredPlayers = useMemo(() => {
    if (!data.size || !deferredFilter) return playersArray;
    const lowerFilter = deferredFilter.toLowerCase();
    return playersArray.filter(player => {
      const name = player.name?.toLowerCase() || '';
      const serverId = player.serverId?.toString() || '';
      const hasMatchingTag = player.tags?.some(tag => tag.label?.toLowerCase().includes(lowerFilter)) || false;
      return name.includes(lowerFilter) || serverId.includes(lowerFilter) || hasMatchingTag;
    });
  }, [playersArray, deferredFilter, data.size]);

  const renderPlayer = useCallback((index, item) => <PlayerComponent {...item} />, []);

  if (!data.size || filteredPlayers.length === 0) {
    return <EmptyState />;
  }

  return (
    <Virtuoso
      style={virtuosoStyles}
      data={filteredPlayers}
      itemKey={(index, player) => player.serverId}
      components={{
        Item: ({ children, ...props }) => (
          <div {...props} style={{ marginBottom: '2px' }}>
            {children}
          </div>
        ),
      }}
      itemContent={renderPlayer}
    />
  );
};

export default memo(Playerlist);