local players = {}
local droppedPlayers = {}
local epoch = 0



lib.callback.register('scoreboard:getPlayers', function(source, clientEpoch)
    if epoch == clientEpoch then return false end
    return players, epoch
end)

AddEventHandler('esx:playerLoaded', function (source, xPlayer)
    local src = source
    local plySrc = tostring(src)
    players[plySrc] = {
        name = xPlayer.name
    }
    epoch = epoch + 1
end)

AddEventHandler("playerJoining", function(src)
    local plySrc = tostring(source)
    players[plySrc] = {
        username = GetPlayerName(src)
    }
    epoch = epoch + 1
end)

AddEventHandler('playerDropped', function (reason, resourceName, clientDropReason)
    local src = source
    local plySrc = tostring(src)
    if not players[plySrc] then return end
    droppedPlayers[plySrc] = players[plySrc]
    droppedPlayers[plySrc].dropped = os.time()
    players[plySrc] = nil
    epoch = epoch + 1
end)


AddEventHandler('onResourceStart', function(resourceName)
    local xPlayers = ESX.GetExtendedPlayers()

    for i, xPlayer in ipairs(xPlayers) do
        players[tostring(xPlayer.source)] = {
            name = xPlayer.name
        }

    end
    epoch = epoch + 1
end)