import {  Tooltip } from '@mantine/core'
import { ConnectIcon, WorldExclamationIcon } from '../utils/icons'

const ConnectionIcon = ({ ping, ...props }) => {
    if (ping < 75) return null;

    return <Tooltip label={ping + " ms"}>
        <ConnectIcon color={ping > 150 ? "var(--mantine-color-red-text)" : "var(--mantine-color-orange-text)"} {...props} />
    </Tooltip>


}

export default ConnectionIcon
