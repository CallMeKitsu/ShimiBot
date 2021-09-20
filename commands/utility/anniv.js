const Discord = require('discord.js')
const fetch = require('node-fetch')
module.exports.run = async (client, message, args) => {

    if(!args[1]) return message.channel.send(`mauvaise utilisation de la commande, regardez le \`${client.prefix}help anniv\``)

    if(args[1].startsWith('<@') && args[1].endsWith('>')) {

        client.emit('findanniv', message)

    } else {

        client.emit('newanniv', message)

    }

}

module.exports.config = {
    name: "anniv",
    category: "utility",
    usage: "[ {dd/mm/yyyy} / @user ]",
    stable: "✅ stable",
    description: "ajoute ton anniversaire à la liste\nrenvoie l'anniversaire de l'utilisateur mentionné / vous",
}