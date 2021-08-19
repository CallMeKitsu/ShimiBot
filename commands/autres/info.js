const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    let StableArray = client.commands.filter(stb => stb.config.stable === "✅ stable").map(cmd => cmd.config.name)

    let embed = new Discord.MessageEmbed()
    .setColor(client.config.EmColor)
    .addField("Dev par :", "CallMeKitsu.#0284")
    .addField('version :', client.config.version)
    .addField('invite :', "https://bit.ly/DiscordShimiInvite")
    .addField('site :', "https://bit.ly/CallMeKitsuShimi")
    .addField('GitHub :', "https://bit.ly/DiscordShimiGitHub")
    .addField('connecté sur :', `${client.guilds.cache.size} serveurs`, true)
    .addField('avec le client :', `${client.user.tag}`, true)
    .addField('pour un total de :', `${client.users.cache.size} utilisateurs et ${StableArray.length} commandes`)
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