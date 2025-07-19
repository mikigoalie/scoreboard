import React from 'react'
import { Center, Text } from '@mantine/core'
const SearchIcon = ({ size = 16, ...others }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...others}
        className="icon icon-tabler icons-tabler-outline icon-tabler-zoom-exclamation"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
        <path d="M21 21l-6 -6" />
        <path d="M10 13v.01" />
        <path d="M10 7v3" />
    </svg>
);

const EmptyState = ({ filter }) => {
    return (
        <Center ta="center" p={12} pt={24} style={{ flexDirection: "column" }}>
            <SearchIcon size={32} style={{ marginBottom: 12 }} />
            <Text
                lineClamp={15}
                ta="center"
                style={{ wordBreak: 'break-word' }}
            >
                {filter ? `No players matching filter: ${filter}` : "No players found"}
            </Text>
        </Center>
    )
}

export default EmptyState
