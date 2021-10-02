const Discord = require("discord.js")
module.exports = (client, message) => {

    message.channel.send(`mauvais argument saisi, regardez le \`${client.prefix}help\` de la commande.`)

}