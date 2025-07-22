import React from 'react';
import { Center, Text } from '@mantine/core';
import { SearchIcon, SadEmoji } from '../utils/icons';

const EmptyState = ({ filter }) => {
  return (
    <Center ta="center" p={12} pt={24} style={{ flexDirection: 'column' }}>
      { filter ? <SearchIcon size={32} style={{ marginBottom: 12 }} /> : <SadEmoji size={32} style={{ marginBottom: 12 }} />}
      <Text lineClamp={15} ta="center" style={{ wordBreak: 'break-word' }}>
        {filter ? `No results matching filter: ${filter}` : 'No results found'}
      </Text>
    </Center>
  );
};

export default EmptyState;