import { Avatar, Group, Badge, Text } from '@mantine/core';
import { useMemo } from 'react';
import { UsersIcon } from '../../utils/icons';

const playerName = "TEST";
const playerServerId = 3;
const SocietyComponent = ({ label, playerCount }) => {
	const color = playerCount > 0 ? 'var(--mantine-primary-color-light)' : 'var(--mantine-color-red-light)';
	const textColor = playerCount > 0 ? 'var(--mantine-primary-color-light-color)' : 'var(--mantine-color-red-light-color)';
	return (
		<Group bg="dark.6" pl={4} >
			<Text >{label}</Text>
			<Badge ml="auto" h="2vw" mih={32} miw={86} p={0} m={0} px={8} radius="xs" variant="filled" color={color} leftSection={<UsersIcon
				color={textColor} size={14} />}>
				<Text c={textColor} fz={12}>{playerCount}</Text>
			</Badge>
		</Group>
	);
};

export default SocietyComponent;
