import { Avatar, Group, Badge, Text } from '@mantine/core';
import { useMemo } from 'react';
import { UsersIcon } from '../utils/icons';

const playerName = "TEST";
const playerServerId = 3;
const SocietyComponent = ({ label, playerCount }) => {
	const color = playerCount > 0 ? undefined : 'red';
	return (
		<Group bg="dark.6" pl={4} >
			<Text >{label}</Text>
			<Badge ml="auto" h="2vw" mih={32} miw={86} p={0} m={0} px={8} radius="xs" variant="light" color={color} leftSection={<UsersIcon size={14} />}>
				{playerCount}
			</Badge>
		</Group>
	);
};

export default SocietyComponent;
