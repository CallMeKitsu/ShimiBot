const { Client, Intents, MessageEmbed } = require('discord.js')
const fs = require('fs')
const config = require('../data/config.json')

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.COMMANDS = new Map()

for (const dirName of fs.readdirSync("../commands")) {
  let CATEGORY = new Map()
  for (const fileName of fs.readdirSync(`../commands/${dirName}/`)) {
    const { command } = require(`../commands/${dirName}/${fileName}`)
    CATEGORY.set(fileName.split('.js')[0], command)
  }
  client.COMMANDS.set(dirName, CATEGORY)
}

client.once('ready', () => {

  console.log('Connected');
  client.user.setPresence({ activities: [{ name: "dev by CallMeKitsu." }], status: "online" })

})

client.on('interactionCreate', async interaction => {

  if (!interaction.isCommand()) return;
  const { commandName } = interaction;

  console.log(`la commande [ ${commandName} ] a été éxécutée par [ ${interaction.user.username}#${interaction.user.discriminator} ]`) 

  client.COMMANDS.forEach((catCmds, catName) => {
    if (catCmds.has(commandName)) {
      catCmds.get(commandName).compute(interaction, config, client)
    }
  })

})

client.login(config.token)