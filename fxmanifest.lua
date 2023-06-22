fx_version 'cerulean'

games { 'gta5' }

author 'ZOBYETEAM'

shared_scripts {
    'config/config.lua',
}

client_scripts {
    'client/main.lua'
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/main.lua'
}

ui_page 'interface/index.html'

files {
    'interface/**'
}

dependencies {
    'oxmysql'
}