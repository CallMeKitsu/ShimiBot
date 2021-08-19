const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    client.guilds.cache.forEach(guild => {
        message.channel.send(`${guild.name} | ${guild.id}`);
      })

}
module.exports.config = {
    name: "servers",
    category: "admin",
    usage: "",
    stable: "✅ stable",
    description: "envoie une liste de tous les serveurs du bot",
    cooldown: 10
} 