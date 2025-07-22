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

    if xPlayer then
        groupController.decrementGroup(xPlayer.job.name)
    end

    droppedPlayers[plySrc] = players[plySrc]
    players[plySrc] = nil
end

local function getPlayerList()
    return players
end

local function getDroppedPlayerList()
    return droppedPlayers
end

return { addPlayer = addPlayer, removePlayer = removePlayer, getPlayerList = getPlayerList, getDroppedPlayerList =
getDroppedPlayerList }
