local groups = require 'config'.societies


local function incrementGroup(group)
    if not group then return end

    for label, data in pairs(groups) do
        for i = 1, #data.groups do
            if data.groups[i] == group then
                data.count = (data.count or 0) + 1
            end
        end
    end
end

local function decrementGroup(group)
    if not group then return end

    for label, data in pairs(groups) do
        for i = 1, #data.groups do
            if data.groups[i] == group then
                data.count = math.max((data.count or 0) - 1, 0)
            end
        end
    end
end

local function getGroupList()
    local groupData = {}

    for group, data in pairs(groups) do
        local count = (type(data) == "table" and data.count) or 0
        groupData[group] = { count = count }
    end

    return groupData
end

return {
    incrementGroup = incrementGroup,
    decrementGroup = decrementGroup,
    getGroupList = getGroupList
}
