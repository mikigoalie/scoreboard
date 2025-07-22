import { memo, useMemo, useDeferredValue } from 'react';
import { Virtuoso } from 'react-virtuoso';
import PlayerComponent from '../PlayerComponent';
import EmptyState from './EmptyState';

const virtuosoStyles = {
    flex: 1,
    height: '100%',
    overflow: 'auto',
};

const itemStyles = {
    paddingBottom: '2px',
};

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

    if (!data.size || filteredPlayers.length === 0) {
        return <EmptyState />;
    }

    return (
        <Virtuoso
            style={virtuosoStyles}
            data={filteredPlayers}
            itemContent={(index, item) => (
                <div style={itemStyles}>
                    <PlayerComponent
                        key={item.serverId} // Ensure unique key
                        serverId={item.serverId}
                        username={item?.username}
                        name={item?.name}
                        tags={item?.tags}
                        localPlayer={item?.localPlayer}
                        ping={item?.ping}
                    />
                </div>
            )}
            aria-label="List of players"
        />
    );
};

export default memo(Playerlist);