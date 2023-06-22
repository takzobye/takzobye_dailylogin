fx_version 'cerulean'

game 'gta5'

author 'ZOBYETEAM'
description 'Party System By ZOBYETEAM'
version '1.1.7'

client_scripts {
    'config/config.lua',
    'client/main.lua',
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'config/config.lua',
    'server/main.lua'
}

ui_page 'interface/index.html'

files {
    'interface/**'
}

dependencies {
    'oxmysql',
}

exports {
    'openParty',
    'addInventoryItem',
    'getTargetGive',
    'isHasParty',
    'getPartyMemberCount'
}
