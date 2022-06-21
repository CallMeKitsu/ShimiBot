const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('../data/config.json');

const fs = require('fs')

let COMMANDS = new Map()

for (const dirName of fs.readdirSync("../commands")) {

  for (const fileName of fs.readdirSync(`../commands/${dirName}/`)) {
    
    const { command } = require(`../commands/${dirName}/${fileName}`)
    COMMANDS.set(fileName.split('.js')[0], command)

  }
  
}

let commands = []

COMMANDS.forEach( (CMDhandler, CommandName) => {

  commands.push(CMDhandler.structure)

})

commands = commands.map( command => command.toJSON() )

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log('Commandes déployées.'))
  .catch(console.error)