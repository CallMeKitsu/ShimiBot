const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    message.delete()
    message.channel.send(args.slice(1).join(" "))

}

module.exports.config = {
    name: "send",
    category: "admin",
    usage: "{message}",
    stable: "✅ stable",
    description: "envoie le message sous le nom du bot",
} 