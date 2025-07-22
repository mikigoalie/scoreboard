local groupController = require 'modules.groups'
local players = {}
local droppedPlayers = {}

local function addPlayer(source, xPlayer)
    local src = source
    if not src then
        return
    end

    local plySrc = tostring(src)
    players[plySrc] = {}

    players[plySrc].serverId = src
    if xPlayer then
        groupController.incrementGroup(xPlayer.job.name)
        players[plySrc].name = xPlayer.name
        players[plySrc].tags = lib.array:new()
        players[plySrc].group = xPlayer.job.name
        if xPlayer.admin then
            lib.array.push(players[plySrc].tags, {
                label = "admin"
            })
        end
    else
        players[plySrc].username = GetPlayerName(src)
    end
end

local function removePlayer(source, xPlayer)
    local src = source
    if not src then
        return
    end

    local plySrc = tostring(src)
    if not players[plySrc] then return end

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
    if not src then
        return
    end

    local plySrc = tostring(src)
    if not players[plySrc] or not players[plySrc].group then return end

    groupController.decrementGroup(players[plySrc].group)
end

local function incrementPlayerGroup(source)
    local src = source
    if not src then
        return
    end

    local plySrc = tostring(src)
    if not players[plySrc] or not players[plySrc].group then return end
    groupController.incrementGroup(players[plySrc].group)
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
    getDroppedPlayerList =
        getDroppedPlayerList
}
