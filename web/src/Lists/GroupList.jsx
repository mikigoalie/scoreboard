import { memo, useMemo } from 'react';
import { Virtuoso } from 'react-virtuoso';
import SocietyComponent from '../GroupComponent';

const virtuosoStyles = {
  flex: 1,
  height: '100%',
  overflow: 'auto',
};

const itemStyles = {
  paddingBottom: '2px',
};

const GroupList = ({ filter, data }) => {
  const societyArray = useMemo(() => {
    return Array.from(data.entries()).map(([id, item]) => ({
      label: id,
      ...item,
    }));
  }, [data]);

  console.log(JSON.stringify(societyArray))

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
