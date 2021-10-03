const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    if(!args[1]) return client.emit('noArgs', message)
    if(!args[2]) return client.emit('noArgs', message)

    let channel = message.mentions.channels.first() || client.channels.cache.get(args[1])

    if(!channel) return client.emit('invalidChannel', message)

    if(!channel.permissionsFor(channel.guild.me).has('SEND_MESSAGES')) {
        return message.channel.send("Shimi doit avoir la permission d'envoyer des messages dans ce salon")
    }

    let post = args.slice(2).join(" ")

    channel.send(post)

}

module.exports.config = {
    name: "post",
    category: "admin",
    usage: "{channel}",
    stable: "✅ stable",
    description: "envoie un post dans le salon précisé",
}