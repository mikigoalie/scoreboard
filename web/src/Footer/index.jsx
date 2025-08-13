import { memo } from 'react';
import { Box, Badge, Group, Tooltip, Center } from '@mantine/core';
import { UserIcon, UsersIcon, SettingsIcon } from '../utils/icons';
import { getRelativeTime } from '../utils/misc';
import { DateTime, Settings } from "luxon";
Settings.defaultLocale = "en"

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
        <Box p={16} w="100%" >
            <Box >
                <Group justify="center" >
                    <Tooltip withArrow label={locale.ui_footer_serverid}>
                        <Badge leftSection={<UserIcon size={14} />} variant="default" c="dimmed">{playerServerId}</Badge>
                    </Tooltip>
                    <Tooltip withArrow label={locale.ui_footer_playercount}>
                        <Badge leftSection={<UsersIcon size={14} />} variant="default" c="dimmed">
                            {playerListCount} / {maxPlayersCount}
                        </Badge>
                    </Tooltip>

                    <Tooltip withArrow label={locale.ui_footer_playercount}>
                        <Badge leftSection={<UsersIcon size={14} />} variant="default" c="dimmed" onClick={() => Settings.defaultLocale = "en"}>
                            {DateTime.fromSeconds(1754957393).toRelative()}
                        </Badge>
                    </Tooltip>
                    <Badge variant="default" p={4} c="dimmed" component="button" onClick={() => console.log('HEY')}>
                        <Center>
                            <SettingsIcon size={14} />
                        </Center>
                    </Badge>
                </Group>
            </Box>
        </Box>
    );
}

export default memo(Footer);