import React from 'react';
import { Center, Text } from '@mantine/core';
import { SearchIcon } from '../utils/icons';

const EmptyState = ({ filter }) => {
  return (
    <Center ta="center" p={12} pt={24} style={{ flexDirection: 'column' }}>
      <SearchIcon size={32} style={{ marginBottom: 12 }} />
      <Text lineClamp={15} ta="center" style={{ wordBreak: 'break-word' }}>
        {filter ? `No players matching filter: ${filter}` : 'No players found'}
      </Text>
    </Center>
  );
};

export default EmptyState;