local qbx = exports.qbx_core
local playerController = require 'modules.players'
local groupController = require 'modules.groups'
local epoch = require 'modules.epoch'

local currentResource = GetCurrentResourceName()
AddEventHandler('onResourceStart', function(resourceName)
    if currentResource ~= resourceName then return end
    local players = GetPlayers()
    for _, playerId in ipairs(players) do
        local xData = { username = GetPlayerName(playerId) }
        local xPlayer = qbx:GetPlayer(playerId)
        if xPlayer then
            xData.name = ('%s %s'):format(xPlayer.PlayerData.charinfo.firstname, xPlayer.PlayerData.charinfo.lastname)
        end
        playerController.addPlayer(playerId, xData)
    end

    epoch.onUpdate()
end)

AddEventHandler('QBCore:Server:OnPlayerLoaded', function()
    local xPlayer = qbx:GetPlayer(source)
    if not xPlayer then return end
    playerController.addPlayer(playerId, {
        name = ('%s %s'):format(xPlayer.PlayerData.charinfo.firstname, xPlayer.PlayerData.charinfo.lastname),
        username = xPlayer.PlayerData.name
    })
    epoch.onUpdate()
end)

AddEventHandler('QBCore:Server:OnPlayerUnload', function(source)
    playerController.decrementPlayerGroup(source)
    epoch.onUpdate()
end)

AddEventHandler("playerJoining", function()
    local source = source
    playerController.addPlayer(source, {
        username = GetPlayerName(source)
    })
    epoch.onUpdate()
end)

AddEventHandler('playerDropped', function(reason, resourceName, clientDropReason)
    local source = source
    playerController.removePlayer(source)
    epoch.onUpdate()
end)

AddEventHandler('QBCore:Server:OnJobUpdate', function(source)
    local source = source
    local previousJob = playerController.getPlayerPreviousGroup(source)
    if previousJob then
        groupController.decrementGroup(previousJob)
    end

    local xPlayer = qbx:GetPlayer(source)
    if xPlayer then
        playerController.addPlayer(playerId, {
            name = ('%s %s'):format(xPlayer.PlayerData.charinfo.firstname, xPlayer.PlayerData.charinfo.lastname),
            username = xPlayer.PlayerData.name,
            group = xPlayer.PlayerData.job.name
        })
    end
    epoch.onUpdate()
end)



return {
    getPlayerList = playerController.getPlayerList,
    getDroppedPlayerList = playerController.getDroppedPlayerList,
    getGroupList = groupController.getGroupList
}
