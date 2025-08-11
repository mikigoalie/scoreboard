local groupController = require 'modules.groups'
local players = {}
local droppedPlayers = {}

local function addPlayer(source, data)
    local src = source
    if not src then return end
    local plySrc = type(src) == "string" and src or tostring(src)
    players[plySrc] = data
    players[plySrc].serverId = src
end

local function removePlayer(source)
    local src = source
    if not src then return end
    local plySrc = type(src) == "string" and src or tostring(src)

    if players[plySrc].group then
        groupController.decrementGroup(players[plySrc].group)
        players[plySrc].group = nil
    end

    droppedPlayers[plySrc] = players[plySrc]
    players[plySrc] = nil
end

local function getPlayerList()
    local cleanedPlayers = players
    return cleanedPlayers
end

local function decrementPlayerGroup(source)
    local src = source
    if not src then return end
    local plySrc = type(src) == "string" and src or tostring(src)
    if not players[plySrc] or not players[plySrc].group then return end
    groupController.decrementGroup(players[plySrc].group)
end

local function incrementPlayerGroup(source)
    local src = source
    if not src then return end
    local plySrc = type(src) == "string" and src or tostring(src)
    if not players[plySrc] or not players[plySrc].group then return end
    groupController.incrementGroup(players[plySrc].group)
end

local function getPlayerPreviousGroup(source)
    local src = source
    if not src then return end
    local plySrc = type(src) == "string" and src or tostring(src)
    if not players[plySrc] or not players[plySrc].group then return false end
    return players[plySrc].group
end

local function setPlayerPreviousGroup(source, group)
    local src = source
    if not src or not group then return end
    local plySrc = type(src) == "string" and src or tostring(src)
    if not players[plySrc] then return false end
    players[plySrc].group = group
end

local function getDroppedPlayerList()
    return droppedPlayers
end

return {
    addPlayer = addPlayer,
    incrementPlayerGroup = incrementPlayerGroup,
    decrementPlayerGroup = decrementPlayerGroup,
    removePlayer = removePlayer,
    getPlayerList = getPlayerList,
    getDroppedPlayerList = getDroppedPlayerList,
    getPlayerPreviousGroup = getPlayerPreviousGroup,
    setPlayerPreviousGroup = setPlayerPreviousGroup
}
