import { memo, useMemo } from 'react';
import { Virtuoso } from 'react-virtuoso';
import SocietyComponent from '../GroupComponent';
import EmptyState from './EmptyState';

const GroupList = ({ filter, data }) => {
  const societyArray = useMemo(() => {
    return Array.from(data.entries()).map(([id, item]) => ({
      label: id,
      ...item,
    }));
  }, [data]);

  if (!data.size) {
    return <EmptyState />;
  }

  return (
    <Virtuoso
      style={{ overflow: 'auto' }}
      data={societyArray}
      itemKey={(index, player) => player.serverId}
      components={{
        Item: ({ children, ...props }) => (
          <div {...props}>
            {children}
          </div>
        ),
      }}
      itemContent={(index, item) => (
        <SocietyComponent
          id={item.id}
          label={item.label}
          playerCount={item.count}
        />
      )}
    />
  );
};

export default memo(GroupList);