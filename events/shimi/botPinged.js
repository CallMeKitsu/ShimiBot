const Discord = require("discord.js")
module.exports = (client, message) => {

    message.channel.send(`Coucou, je suis Shimi ! :3\nmon préfixe est ${client.prefix}, tu peux voir la liste des commandes avec \`${client.prefix}help\` :P`)

}