const Discord = require("discord.js")
module.exports = (client, message) => {

    message.channel.send(`au moins un argument doit être utilisé, regardez le \`${client.prefix}help\` de la commande.`)

}