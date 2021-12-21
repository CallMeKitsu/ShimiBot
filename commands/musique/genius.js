const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports.run = async (client, message, args) => {

    const API_KEY = client.apiLIST.keys.genius

    let REQUEST = args[2]
    if(!REQUEST) return client.emit('noArgs', message)

    if(args[1] === "song") client.emit("gSong", message)
    else if(args[1] === "artist") return message.channel.send('en développement !')
    else if(args[1] === "album") return message.channel.send('en développement !')
    else return client.emit('invalidArg', message)
}

module.exports.config = {
    name: "genius",
    category: "musique",
    usage: "[song / album / artist] {recherche}",
    stable: "🟩 unhandled",
    description: "renvoie des informations sur un son / un artiste / un album\nRenvoie les paroles du son recherché !\nS/O GENIUS pour l'API !",
}