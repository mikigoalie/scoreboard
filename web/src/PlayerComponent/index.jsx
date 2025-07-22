import { useMemo } from 'react';
import { Group, Badge, Text, Box, Loader } from '@mantine/core';

function getPlayerTags(tags) {
  if (!tags || !tags.length) return null;

  return tags.slice(0, 3).map(({ label, variant, radius, color }, index) => (
    <Badge
      key={`tag-${label}-${index}`}
      variant={variant || 'light'}
      radius={radius || 'xs'}
      color={color || undefined}
      size="xs"
    >
      {label}
    </Badge>
  ));
}

const PlayerComponent = ({ serverId, username, name, tags = [], localPlayer, ping, data }) => {
  const playerLoading = !name;

  const playerTags = getPlayerTags(tags);
  const backgroundColor = useMemo(
    () =>
      localPlayer
        ? 'var(--mantine-primary-color-light-hover)'
        : playerLoading
          ? 'dark.9'
          : 'dark.6',
    [localPlayer, playerLoading]
  );

  return (
    <Group
      bg={backgroundColor}
      pr={2}
      wrap="nowrap"
      align="center"
      w="100%"
      gap={10}
    >
      <Badge
        miw={48}
        maw={128}
        h="2.3rem"
        w="3.5rem"
        mih={32}
        p={2}
        m={0}
        radius="xs"
        variant="light"
      >
        <Text truncate="end" wrap="nowrap">
          {String(serverId)}
        </Text>
      </Badge>

      <Box
        style={{
          flex: 1,
          minWidth: 0,
          whiteSpace: 'nowrap',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <Text
          truncate="end"
          wrap="nowrap"
          whiteSpace="nowrap"
          c={
            playerLoading
              ? 'dimmed'
              : localPlayer
                ? 'var(--mantine-primary-color-light-color)'
                : undefined
          }
        >
          {playerLoading ? username : name}
        </Text>
      </Box>

      <Box
        ml="auto"
        style={{
          maxWidth: 'auto',
          display: 'flex',
          flexDirection: 'row',
          gap: 8,
        }}
      >
        {playerLoading ? (
          <Loader mr="xs" size="xs" type="dots" />
        ) : (
          <Group wrap="wrap" justify="flex-end" gap={2} pr={2}>
            {playerTags}
          </Group>
        )}
      </Box>
    </Group>
  );
};

export default PlayerComponent;