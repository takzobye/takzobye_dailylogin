ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

MySQL.ready(function()
    Wait(500)

    local xPlayers = ESX.GetExtendedPlayers()

    for _, xPlayer in ipairs(xPlayers) do
        loadPlayerDailyLogin(xPlayer)
    end
end)

RegisterNetEvent('esx:playerLoaded', function(playerId)
    Wait(2000)

    loadPlayerDailyLogin(ESX.GetPlayerFromId(playerId))
end)

function loadPlayerDailyLogin(xPlayer)
    local currentDate = os.date('%d/%m')
    local row = MySQL.single.await('SELECT `daily_login` FROM `users` WHERE `identifier` = ? LIMIT 1', { xPlayer.identifier })

    if not row then return end

    local data = row.daily_login and json.decode(row.daily_login)

    if not data then return end
    
    if Config.dailyLogin.key == data.key then
        local progress = data.progress or 0

        TriggerClientEvent('zobyeteam_dailylogin:sendProgress', xPlayer.source, progress, currentDate == data.lastLogin)
    else
        MySQL.update.await('UPDATE users SET daily_login = NULL WHERE identifier = ?', { xPlayer.identifier })
    end
end

RegisterNetEvent('zobyeteam_dailylogin:receive', function(targetIndex)
    if not targetIndex then return end

    local playerId = source
    local xPlayer = ESX.GetPlayerFromId(playerId)

    if not xPlayer then return end

    local item = Config.dailyLogin.items[targetIndex]
    if not item then return end

    local data = {
        key = Config.dailyLogin.key,
        progress = targetIndex,
        lastLogin = os.date('%d/%m')
    }
    
    local affectedRow = MySQL.update.await('UPDATE users SET daily_login = ? WHERE identifier = ?', { json.encode(data), xPlayer.identifier })

    if not affectedRow then return end
    xPlayer.addInventoryItem(item.name, item.amount)
end)