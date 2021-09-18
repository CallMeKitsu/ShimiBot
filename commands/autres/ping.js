const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    let embed = new Discord.MessageEmbed()
    .setColor(client.config.EmColor)
    .setThumbnail(client.user.avatarURL())
    .addField(`Ping :`, `${Date.now() - message.createdTimestamp}ms`)
    .addField(`API : `,`${Math.round(client.ws.ping)}ms`)

    message.channel.send(embed)

}

module.exports.config = {
    name: "ping",
    category: "autres",
    usage: "",
    stable: "✅ stable",
    description: "renvoie la latence actuelle",
} 