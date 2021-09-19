const Discord = require('discord.js')
const fetch = require('node-fetch')
module.exports.run = async (client, message, args) => {

    if(!args[1]) return message.channel.send(`mauvaise utilisation de la commande, regardez le \`${client.config.prefix}help lag\``)

    if(args[1].startsWith('<@') && args[1].endsWith('>')) {

        client.emit('findlag', message)

    } 

    else if(args[1] === "set") {

        if(!args[2]) return message.channel.send('mauvaise utilisation de la commande')
        client.emit('newlag', message)

    }
    else return message.channel.send('mauvaise utilisation de la commande')

}

module.exports.config = {
    name: "lag",
    category: "utility",
    usage: "[ @user / set [+x / -x] ]",
    stable: "✅ stable",
    description: "ajoute ton décalage horaire à la liste\nrenvoie l'heure locale de l'utilisateur mentionné",
}