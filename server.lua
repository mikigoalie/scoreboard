local players = {}
local droppedPlayers = {}
local epoch = os.time()



lib.callback.register('scoreboard:getPlayers', function(source, clientEpoch)
    if epoch == clientEpoch then return false end

    print('RETURN PLAYER LIST', clientEpoch, epoch)
    return players, epoch
end)

AddEventHandler('esx:playerLoaded', function (source, xPlayer)
    local src = source
    local plySrc = tostring(src)
    players[plySrc] = {
        name = xPlayer.name
    }
    epoch = os.time()
end)

--AddEventHandler('esx:playerLogout', function (playerId)
--end)

AddEventHandler("playerJoining", function(src)
    local plySrc = tostring(source)
    players[plySrc] = {
        username = GetPlayerName(src)
    }
    epoch = os.time()
end)

AddEventHandler('playerDropped', function (reason, resourceName, clientDropReason)
    local src = source
    local plySrc = tostring(src)
    if not players[plySrc] then return end
    droppedPlayers[plySrc] = players[plySrc]
    droppedPlayers[plySrc].dropped = os.time()
    players[plySrc] = nil
    epoch = os.time()
end)


AddEventHandler('onResourceStart', function(resourceName)
    local xPlayers = ESX.GetExtendedPlayers()

    for i, xPlayer in ipairs(xPlayers) do
        players[tostring(xPlayer.source)] = {
            name = xPlayer.name
        }

        if xPlayer.source == 3 then
            players[tostring(xPlayer.source)] . tags = {{  label = "ma baaaaaaaby", color = "red" }}
        end
    end
    epoch = os.time()
end)