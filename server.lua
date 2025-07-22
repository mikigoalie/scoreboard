local module_path = string.format("modules.framework.%s", require 'config'?.framework or "qbx")
local success, framework = pcall(require, module_path)
if not success then
    return lib.print.error('FRAMEWORK NOT VALID / INSTALLED FRAMEWORK! Check your configuration file.')
end

local epoch = require 'modules.epoch'

lib.callback.register('scoreboard:getData', function(source, clientEpoch)
    local validEpoch = epoch.value

    if validEpoch == clientEpoch then
        return false
    end

    return true, validEpoch, {
        players = framework.getPlayerList(),
        droppedPlayers = framework.getDroppedPlayerList(),
        groups = framework.getGroupList()
    }
end)
