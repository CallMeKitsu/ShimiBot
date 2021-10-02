const Discord = require("discord.js")
module.exports = (client, message) => {

    message.channel.send(`erreur de base de données. Merci de report avec \`${client.prefix}report\` !`)

}