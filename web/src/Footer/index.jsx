import { memo } from 'react';
import { Box, Badge, Group, Tooltip, Divider } from '@mantine/core';
import { UserIcon, UsersIcon } from '../utils/icons';

function Footer({
    playerServerId = 0,
    playerListCount = 0,
    maxPlayersCount = 0,
    locale = {
        ui_footer_serverid: 'Server ID',
        ui_footer_playercount: 'Players online',
    },
}) {
    return (
        <>
    <Divider mt="auto" />
            <Box p={16} w="100%" >
                <Box >
                    <Group justify="center">
                        <Tooltip withArrow label={locale.ui_footer_serverid}>
                            <Badge leftSection={<UserIcon size={14} />} variant="default">{playerServerId}</Badge>
                        </Tooltip>
                        <Tooltip withArrow label={locale.ui_footer_playercount}>
                            <Badge leftSection={<UsersIcon size={14} />} variant="default">
                                {playerListCount} / {maxPlayersCount}
                            </Badge>
                        </Tooltip>
                    </Group>
                </Box>                
            </Box>
        </>


    );
}

export default memo(Footer);