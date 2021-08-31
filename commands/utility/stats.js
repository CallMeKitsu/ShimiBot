const Discord = require('discord.js')
const fetch = require('node-fetch')
module.exports.run = async (client, message, args) => {

    if(args[1] === "lol") client.emit('lol', message)
    else return message.channel.send('veuillez préciser de quel jeu voulez vous les stats : `lol`, ...')

}

module.exports.config = {
    name: "stats",
    category: "utility",
    usage: "{jeu} {joueur}",
    stable: "✅ stable",
    description: "renvoie les stats d'un joueur\n!! ne peut contenir de caractères spéciaux",
}