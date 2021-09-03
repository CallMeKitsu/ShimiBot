const Discord = require('discord.js')
let ytld = require("ytdl-core")
module.exports.run = async (client, message, args) => {

    if(message.member.voice.channel) {

        client.emit('play', message)

    } else return message.channel.send('vous n\'êtes connecté dans aucun salon')

}

module.exports.config = {
    name: "disconnect",
    category: "musique",
    usage: "",
    stable: "✅ stable",
    description: "quitte le vocal dans lequel il est",
    cooldwon: 15
}