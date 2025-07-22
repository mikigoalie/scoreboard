fx_version 'cerulean'
use_experimental_fxv2_oal 'yes'
lua54 'yes'
game 'gta5'
node_version '22'

ui_page 'web/dist/index.html'

shared_scripts { '@ox_lib/init.lua' }
server_scripts { 'server.lua' }
client_scripts { 'client.lua'  }
files { 'web/dist/**/*', 'locales/*.json' }