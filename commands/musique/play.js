const Discord = require('discord.js')
let ytld = require("ytdl-core")
module.exports.run = async (client, message, args) => {

    if(message.member.voice.channel) {

        message.channel.send('connection..')
        client.emit('player', message)

    } else return message.channel.send('vous n\'êtes connecté dans aucun salon')

}

module.exports.config = {
    name: "play",
    category: "musique",
    usage: "{youtube-url}",
    stable: "❌ instable",
    description: "rejoint votre vocal et joue de la musique !",
}