local syncQueue = {}
local playerController = require 'modules.players'
local groupController = require 'modules.groups'

local M = {
    value = 0
}

function M.onUpdate()
    M.value = M.value + 1
    for playerServerId in pairs(syncQueue) do
        local playerId = assert(tonumber(playerServerId))

        TriggerClientEvent('scoreboard:sync', playerId, M.value, {
            players = playerController.getPlayerList(),
            droppedPlayers = playerController.getDroppedPlayerList(),
            groups = groupController.getGroupList()
        })
    end
end

RegisterNetEvent('scoreboard:toggled', function(isOpened)
    local source = source
    local plySrc = tostring(source)
    syncQueue[plySrc] = isOpened and true or nil
end)

return M
