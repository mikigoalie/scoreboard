lib.locale()

local activated = false
local focused = false


local scoreboardThread = function()
    SetNuiFocus(true, true)
    SetNuiFocusKeepInput(true)
    while activated do
        HudWeaponWheelIgnoreSelection()
        DisablePlayerFiring(cache.playerId, true)
        DisableControlAction(0, 1, true)
        DisableControlAction(0, 2, true)
        DisableControlAction(0, 200, true)
        Wait(0)
    end

    SetNuiFocus(false, false)
    SetNuiFocusKeepInput(false)
end

local keybind = lib.addKeybind({
    name = 'scoreboard',
    description = 'Press TAB to open scoreboard',
    defaultKey = 'TAB',
    onPressed = function(self)
        SendNUIMessage({ action = "scoreboard:toggle" })
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
    if (hasOpened) then CreateThread(scoreboardThread) end
    cb({
        test = "TESTTT"
    })
end)


RegisterNUICallback('scoreboard:loaded', function(_, cb)
    cb({
        locale = lib.getLocales(),
        playerServerId = cache.serverId,
        maxPlayersCount = GetConvarInt('sv_maxclients', 30),
        withOverlay = true,
        drawerProps = {
            position = "left",
            offset = 4,
            radius = "md"
        }
    })
end)


AddEventHandler('ox_lib:setLocale', function()
    print(json.encode(lib.getLocales()))
end)

AddStateBagChangeHandler("scoreboard", ('player:%s'):format(cache.serverId), function(bagName, key, value)
    activated = value
end)


local currentRs = GetCurrentResourceName()
AddEventHandler('onResourceStop', function(rs)
    if (rs ~= currentRs) then return end
end)
