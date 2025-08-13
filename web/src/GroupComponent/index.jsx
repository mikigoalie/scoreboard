import { Box, Group, Badge, Text } from '@mantine/core';
import { memo } from 'react';
import { UsersIcon } from '../utils/icons';

const SocietyComponent = ({ label, playerCount }) => {
	const color = playerCount > 0 ? undefined : 'red';
	return (
		<Group className="society item-component">
			<Text
				className="player-name-text"
				truncate="end"
				wrap="nowrap"

			>
				{label}
			</Text>
			<Badge ml="auto" h="100%" miw={86} p={0} m={0} px={8} radius={0} variant="light" color={color} leftSection={<UsersIcon size={14} />}>
				{playerCount}
			</Badge>
		</Group>
	);
};

export default memo(SocietyComponent);