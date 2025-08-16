lib.locale()
local cachedData = {}
local activated = false
local lastEpoch = 0


local scoreboardThread = function()
    SetNuiFocus(true, true)
    SetNuiFocusKeepInput(true)
    TriggerServerEvent('scoreboard:toggled', true)
    while activated do
        HudWeaponWheelIgnoreSelection()
        DisablePlayerFiring(cache.playerId, true)
        DisableControlAction(0, 1, true)
        DisableControlAction(0, 2, true)
        DisableControlAction(0, 200, true)
        Wait(0)
    end
    TriggerServerEvent('scoreboard:toggled', false)
    SetNuiFocus(false, false)
    SetNuiFocusKeepInput(false)
end

local keybind = lib.addKeybind({
    name = 'scoreboard',
    description = 'Press TAB to open scoreboard',
    defaultKey = 'TAB',
    onPressed = function(self)
        if activated then return SendNUIMessage({ action = "scoreboard:hide" }) end

        if IsNuiFocused() then
            return
        end

        local requireSync, epoch, data = lib.callback.await('scoreboard:getData', 500, lastEpoch)


        if not requireSync then
            return SendNUIMessage({ action = "scoreboard:display" })
        end

        lastEpoch = epoch
        if data.players then
            data.players?[tostring(cache.serverId)].localPlayer = true
        end

        print(json.encode(data))
        cachedData = data
        SendNUIMessage({ action = "scoreboard:display", data = cachedData })
    end
})




RegisterNUICallback('scoreboard:focus', function(hasFocus, cb)
    /*
        if (hasfocus) then
            print('notify player that he cannot move')
        end
    */

    SetNuiFocusKeepInput(not hasFocus)
    cb({})
end)

RegisterNUICallback('scoreboard:toggled', function(hasOpened, cb)
    LocalPlayer.state:set('scoreboard', hasOpened, false)
    if (hasOpened) then
        CreateThread(scoreboardThread)
    end

    cb({})
end)


RegisterNUICallback('scoreboard:loaded', function(_, cb)
    cb({
        locale = lib.getLocales(),
        playerServerId = cache.serverId,
        maxPlayersCount = GetConvarInt('sv_maxclients', 30),
        withOverlay = true,
        drawerProps = {
            position = "right",
            offset = 12,
            radius = "md"
        }
    })
end)


AddEventHandler('ox_lib:setLocale', function()
    local locales = lib.getLocales()
    SendNUIMessage({
        action = "scoreboard:updatecfg",
        data = {
            locale = locales
        }
    })
end)

AddStateBagChangeHandler("scoreboard", ('player:%s'):format(cache.serverId), function(bagName, key, value)
    activated = value
end)


local currentRs = GetCurrentResourceName()
AddEventHandler('onResourceStop', function(rs)
    if (rs ~= currentRs) then return end
end)

RegisterNetEvent('scoreboard:sync', function(epoch, data)
    cachedData = data
    if cachedData.players then
        cachedData.players?[tostring(cache.serverId)].localPlayer = true
    end

    lastEpoch = epoch
    SendNUIMessage({ action = "scoreboard:update", data = cachedData })
end)
RegisterCommand('test', function()
    SendNUIMessage({
        action = "scoreboard:updatecfg",
        data = {
            locale = {
                ui_footer_serverid = "Tvé TESTTT ID",
                ui_footer_playercount = "Počet hráčů",
                ui_tab_players = "Hráči",
                ui_tab_players_disconnected = "Odpojení hráči",
                ui_tab_societies = "Společnosti",
                ui_tab_filter_players = "Filtruj dle jména, id nebo tagu",
                ui_tab_filter_societies = "Filtruj dle skupiny nebo jejich zkratky"
            }
        }
    })
end)