import { useMemo, memo } from 'react';
import { Group, Badge, Text, Box, Loader } from '@mantine/core';

function getPlayerTags(tags) {
  if (!Array.isArray(tags) || !tags.length) return null;

  return tags.slice(0, 3).map(({ label, ...badgeProps }, index) => (
    <Badge
      key={`tag-${label}-${index}`}
      variant={'light'}
      radius={'xs'}
      size="sm"
      {...badgeProps}
    >
      {label}
    </Badge>
  ));
}

const PlayerComponent = ({ serverId, username, name, tags = [], localPlayer, ping, data }) => {
  const playerLoading = !name;
  const playerTags = useMemo(() => getPlayerTags(tags), [tags]);

  return (
    <Group
      className="player item-component"
      data-player-local={localPlayer}
      data-player-loading={!name}
    >
      <Badge
        className="player-badge"
        radius={0}
        variant="light"
      >
        <Text truncate="end" wrap="nowrap">
          {String(serverId)}
        </Text>
      </Badge>

      <Box className="player-name">
        <Text
          truncate="end"
          wrap="nowrap"
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

export default memo(PlayerComponent);