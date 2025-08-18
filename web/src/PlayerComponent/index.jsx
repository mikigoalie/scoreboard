import { useMemo, memo } from "react";
import { Group, Badge, Text, Box, Loader } from "@mantine/core";
import { getRelativeTime } from "../utils/misc";
import { DisconnectIcon } from "../utils/icons";

function getPlayerTags(tags) {
  if (!Array.isArray(tags) || !tags.length) return null;

  return tags.slice(0, 3).map(({ label, ...badgeProps }, index) => (
    <Badge
      variant="light"
      radius="xs"
      size="sm"
      {...badgeProps}
      key={`tag-${label}-${index}`}
    >
      {label}
    </Badge>
  ));
}

const PlayerComponent = ({
  serverId,
  username,
  name,
  tags = [],
  localPlayer,
  droppedAt,
  loading,
}) => {
  const playerTags = useMemo(() => getPlayerTags(tags), [tags]);

  const renderStatus = () => {
    if (droppedAt) {
      return (
        <Badge
          variant="light"
          radius="xs"
          size="sm"
          color="red"
          leftSection={<DisconnectIcon size={12} />}
        >
          {getRelativeTime(droppedAt)}
        </Badge>
      );
    }

    if (loading) {
      return <Loader mr="xs" size="xs" type="dots" />;
    }

    return (
      <Group wrap="wrap" justify="flex-end" gap={2} pr={2}>
        {playerTags}
      </Group>
    );
  };

  return (
    <Group
      className="player item-component"
      data-player-local={localPlayer}
      data-player-loading={!name}
      data-has-actions
    >
      <Badge className="player-badge" radius={0} variant="light">
        <Text truncate="end" wrap="nowrap">
          {String(serverId)}
        </Text>
      </Badge>

      <Box className="player-name">
        <Text className="player-name-text" truncate="end" wrap="nowrap">
          {username || name}
        </Text>
      </Box>

      <Box
        ml="auto"
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 8,
        }}
      >
        {renderStatus()}
      </Box>
    </Group>
  );
};

export default memo(PlayerComponent);