const Discord = require('discord.js')
let ytld = require("ytdl-core")
module.exports.run = async (client, message, args) => {

    if(message.member.voice.channel) {

        message.channel.send('connection..')
        client.emit('player', message)

    } else return message.channel.send('vous n\'êtes connecté dans aucun salon')

}

module.exports.config = {
    name: "chill",
    category: "musique",
    usage: "",
    stable: "✅ stable",
    description: "rejoint votre vocal et vous rend Chiiiill ~UwU~",
}