local playerController = require 'modules.players'
local groupController = require 'modules.groups'
local epoch = require 'modules.epoch'
local Ox = require '@ox_core.lib.init'
local onlyOnDuty = require 'config'?.onlyIncludeOnDuty or false

AddEventHandler('ox:setActiveGroup', function(playerId, groupName, previousGroupName)
    groupController.decrementGroup(previousGroupName)
    groupController.incrementGroup(groupName)
    playerController.setPlayerPreviousGroup(playerId, groupName)
end)

AddEventHandler('ox:setGroup', function(playerId, groupName, grade)
    if onlyOnDuty then return end
    groupController[grade and grade > 0 and "incrementGroup" or "decrementPlayerGroup"](groupName)
end)

local currentResource = GetCurrentResourceName()
AddEventHandler('onResourceStart', function(resourceName)
    if currentResource ~= resourceName then return end

    local players = GetPlayers()
    for _, playerId in ipairs(players) do
        local xData = {
            username = GetPlayerName(playerId)
        }

        if xPlayer then
            xData.name = xPlayer.get('name')
            local groups = xPlayer.getGroups()
            local activeGroup = xPlayer.get('activeGroup')
            if onlyOnDuty then
                groupController.incrementGroup(xPlayer.get('activeGroup'))
            else
                for group, grade in ipairs(groups) do
                    groupController.incrementGroup(group)
                end
            end

            xData.group = activeGroup
        end

        playerController.addPlayer(playerId, xData)
    end

    epoch.onUpdate()
end)


AddEventHandler('ox:playerLoaded', function(playerId)
    local xPlayer = Ox.GetPlayer(playerId)
    if not xPlayer then return end

    playerController.addPlayer(playerId, {
        name = xPlayer.get('name'),
        username = xPlayer.username
    })

    epoch.onUpdate()
end)

AddEventHandler('ox:playerLogout', function(playerId, userId, charId)
    playerController.decrementPlayerGroup(playerId)
    epoch.onUpdate()
end)

AddEventHandler("playerJoining", function()
    local source = source
    playerController.addPlayer(source, {
        username = GetPlayerName(source)
    })
    epoch.onUpdate()
end)

AddEventHandler('playerDropped', function()
    local source = source
    playerController.removePlayer(source)
    epoch.onUpdate()
end)



return {
    getPlayerList = playerController.getPlayerList,
    getDroppedPlayerList = playerController.getDroppedPlayerList,
    getGroupList = groupController.getGroupList
}
