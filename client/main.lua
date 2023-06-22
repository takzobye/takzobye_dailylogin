ESX = nil

CreateThread(function()
    while ESX == nil do
        TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
        Wait(0)
    end
end)

local isReceivedToday = false
local currentProgress = 0

RegisterCommand('openDailyLogin', function()
    loadData()
    openDisplay()
end, false)
RegisterKeyMapping('openDailyLogin', 'Open Daily Login', 'keyboard', Config.openKey)

RegisterNetEvent('zobyeteam_dailylogin:sendProgress', function(progress, _isReceivedToday)
    currentProgress = progress
    isReceivedToday = _isReceivedToday

    loadData()
end)

RegisterNUICallback('receive', function()
    if isReceivedToday then return end

    local targetIndex = currentProgress + 1

    local item = Config.dailyLogin.items[targetIndex]
    if not item then return end

    TriggerServerEvent('zobyeteam_dailylogin:receive', targetIndex)

    currentProgress = targetIndex
    isReceivedToday = true

    loadData()
end)

function loadData()
    local items = ESX.Table.Clone(Config.dailyLogin.items)

    for index, item in ipairs(items) do
        item.isReceived = currentProgress >= index
    end

    if not isReceivedToday and items[currentProgress + 1] then
        items[currentProgress + 1].canReceive = true
    end

    SendNUIMessage({
        action = 'loadData',
        items = items,
    })
end

function openDisplay()
    SendNUIMessage({
        action = 'openDisplay',
    })
    SetNuiFocus(true, true)
end

function closeDisplay()
    SendNUIMessage({
        action = 'closeDisplay',
    })
    SetNuiFocus(false, false)
end
RegisterNUICallback('closeDisplay', closeDisplay)