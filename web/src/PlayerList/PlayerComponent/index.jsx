import { Group, Badge, Text, Box } from '@mantine/core';
import { useMemo } from 'react';
import ConnectionIcon from './ConnectionIcon';

const PlayerComponent = ({ id, data }) => {
	const { name, tags, localPlayer, ping } = data;

	const playerTags = useMemo(() =>
		tags.slice(0, 3).map(({ label, variant, radius, color }) => (
			<Badge key={label} variant={variant || 'light'} radius={radius || 'xs'} color={color || undefined} size="xs">
				{label}
			</Badge>
		)),
		[tags]
	);

	const backgroundColor = useMemo(() => localPlayer ? 'var(--mantine-primary-color-light-hover)' : 'dark.6', [localPlayer]);

	return (
		<Group bg={backgroundColor} pr={2} wrap="nowrap" align="center" w="100%" gap={6}>
			<Badge
				miw={48}
				maw={128}
				h="2vw"
				w="3vw"
				mih={32}
				p={2}
				m={0}
				radius="xs"
				variant="filled"
				color="var(--mantine-primary-color-light)"
			>
				<Text truncate="end" wrap="nowrap" c="var(--mantine-primary-color-light-color)">
					{String(id)}
				</Text>
			</Badge>


			<Box style={{ flex: 1, minWidth: 0, whiteSpace: 'nowrap', display: "flex", flexDirection: "row", alignItems: "center", gap: 8 }}>
				<Text style={{ whiteSpace: 'nowrap' }}>{name}</Text>
			</Box>

			<Box ml="auto" style={{ maxWidth: 'auto', display: "flex", flexDirection: "row", gap: 8 }}>
				<Group wrap="wrap" justify="flex-end" gap={2} pr={2}>
					{playerTags}
				</Group>

				<ConnectionIcon ping={ping} />
			</Box>
		</Group>
	);
};

export default PlayerComponent;