import { memo, useMemo, useCallback } from 'react';
import { Virtuoso } from 'react-virtuoso';
import SocietyComponent from '../GroupComponent';
import EmptyState from './EmptyState';

const GroupList = ({ filter, data }) => {
  // Convert Map to array of objects
  const societyArray = useMemo(() => {
    return Array.from(data.entries()).map(([id, item]) => ({
      id,
      label: id,
      ...item,
    }));
  }, [data]);

  // Filter societies by label or other properties
  const filteredSocieties = useMemo(() => {
    if (!data.size) return societyArray;

    const lowerFilter = filter.toLowerCase();
    return societyArray.filter(society => {
      const label = society.label?.toLowerCase() || '';
      const name = society.name?.toLowerCase() || '';
      return label.includes(lowerFilter) || name.includes(lowerFilter);
    });
  }, [societyArray, filter, data.size]);

  // Render each society row
  const renderSociety = useCallback(
    (index, item) => (
      <SocietyComponent
        id={item.id}
        label={item.label}
        playerCount={item.count}
      />
    ),
    []
  );

  return (
    <Virtuoso
      style={{ overflow: 'auto' }}
      data={filteredSocieties}
      itemKey={(index, society) => society.id}
      components={{
        EmptyPlaceholder: () => <EmptyState filter={filter} />,
        Item: ({ children, ...props }) => (
          <div {...props}>
            {children}
          </div>
        ),
      }}
      itemContent={renderSociety}
    />
  );
};

export default memo(GroupList);