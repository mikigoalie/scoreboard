---@diagnostic disable: undefined-field
local playerController = require 'modules.players'
local groupController = require 'modules.groups'
local syncQueue = {}
local epoch = 0

local onUpdate = function()
    epoch = epoch + 1
    for playerServerId in pairs(syncQueue) do
        local playerId = assert(tonumber(playerServerId))

        TriggerClientEvent('scoreboard:sync', playerId, epoch, {
            players = playerController.getPlayerList(),
            droppedPlayers = playerController.getDroppedPlayerList(),
            groups = groupController.getGroupList()
        })
    end
end


lib.callback.register('scoreboard:getData', function(source, clientEpoch)
    if epoch == clientEpoch then
        return false
    end
    return true, epoch, {
        players = playerController.getPlayerList(), 
        droppedPlayers = playerController.getDroppedPlayerList(), 
        groups = groupController.getGroupList()
    }
end)

AddEventHandler('esx:playerLoaded', function(source, xPlayer)
    local source = source
    playerController.addPlayer(source, xPlayer)
    onUpdate()
end)

AddEventHandler('esx:playerLogout', function (playerId)
    playerController.decrementPlayerGroup(playerId)
end)

AddEventHandler("playerJoining", function()
    local source = source
    playerController.addPlayer(source)
    onUpdate()
end)

AddEventHandler('playerDropped', function(reason, resourceName, clientDropReason)
    local source = source
    playerController.removePlayer(source)
    onUpdate()
end)

local currentResource = GetCurrentResourceName()
AddEventHandler('onResourceStart', function(resourceName)
    if currentResource ~= resourceName then return end
    local xPlayers = ESX.GetExtendedPlayers()
    for _, xPlayer in pairs(xPlayers) do
        playerController.addPlayer(xPlayer.source, xPlayer)
    end

    onUpdate()
end)


AddEventHandler('esx:setJob', function(source, job, lastJob)
    groupController.decrementGroup(lastJob.name)
    groupController.incrementGroup(job.name)
    onUpdate()
end)


RegisterNetEvent('scoreboard:toggled', function(isOpened)
    local source = source
    local plySrc = tostring(source)
    syncQueue[plySrc] = isOpened and true or nil
end)


local function benchmark(name, callback)
    local startTime = os.nanotime()
    for i = 1, 1 do
        callback()
    end
    local endTime = os.nanotime()
    local diff = endTime - startTime
    print(name .. ' Difference: ' .. diff)
end

CreateThread(function()
    local joaat = joaat
    local GetHashKey = GetHashKey

    benchmark("JOOAT", function()
        local temp = joaat('adder')
    end)

    benchmark("Backticks", function()
        local temp = `adder`
    end)

    benchmark("GetHashKey", function()
        local temp = GetHashKey('adder')
    end)
end)