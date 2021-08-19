const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    let embed = new Discord.MessageEmbed()
    .setColor(client.config.EmColor)
    .addField("Dev par :", "CallMeKitsu.#0284")
    .addField('version :', client.config.version)
    .addField('invite :', "https://bit.ly/DiscordShimiInvite")
    .addField('site :', "https://bit.ly/CallMeKitsuShimi")
    .addField('connecté sur :', `${client.guilds.cache.size} serveurs`, true)
    .addField('avec le client :', `${client.user.tag}`, true)
    .addField('pour un total de :', `${client.users.cache.size} utilisateurs`)
    .setThumbnail(client.user.avatarURL())
    message.channel.send(embed)

}

module.exports.config = {
    name: "info",
    category: "autres",
    usage: "",
    stable: "✅ stable",
    description: "informations du bot",
} 