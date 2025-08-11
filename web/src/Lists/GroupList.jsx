import { memo, useMemo } from 'react';
import { Virtuoso } from 'react-virtuoso';
import SocietyComponent from '../GroupComponent';
import EmptyState from './EmptyState';

const virtuosoStyles = {
  flex: 1,
  height: '100%',
  overflow: 'auto',
};

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
      data={societyArray}
      style={virtuosoStyles}
      itemContent={(index, item) => (
          <SocietyComponent
            id={item.id}
            label={item.label}
            playerCount={item.count}
          />
      )}
      aria-label="List of societies"
    />
  );
};

export default memo(GroupList);
