import { useMemo } from 'react';
import { LoadingOverlay } from '@mantine/core';
import { Virtuoso } from 'react-virtuoso';
import PlayerComponent from '../PlayerComponent';
import SocietyComponent from '../SocietyComponent';
import EmptyState from './EmptyState';

const List = ({ tab, players, societies, loading, filter }) => {
  // Choose dataset depending on tab
  const isPlayerTab = tab === 'tab_players';
  const data = useMemo(() => (isPlayerTab ? players : societies), [isPlayerTab, players, societies]);

  // Styles
  const virtuosoStyles = {
    flex: 1,
    height: '100%',
    overflow: 'auto',
  };

  const itemStyles = {
    paddingBottom: '2px',
  };

  // Render empty state if data is empty
  if (data.length === 0) {
    return <EmptyState filter={filter} />;
  }

  return (
    <>
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      <Virtuoso
        data={data}
        style={virtuosoStyles}
        itemContent={(index, item) =>
          isPlayerTab ? (
            <PlayerComponent key={item.serverId} id={item.serverId} data={item} />
          ) : (
            <SocietyComponent key={item.name} id={item.name} data={item} />
          )
        }
        components={{
          Item: ({ children, ...props }) => (
            <div {...props} style={itemStyles}>
              {children}
            </div>
          ),
        }}
        aria-label={isPlayerTab ? 'List of players' : 'List of societies'}
      />
    </>
  );
};

export default List;