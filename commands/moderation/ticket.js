const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    // CHAN.ID_send_embed <.category name == support>

    let embedChannel = message.mentions.channels.first() || client.channels.cache.get(args[1])
    if(!embedChannel) return message.channel.send(`le salon n'existe pas ou n'a pas été trouvé`)

    let embed = new Discord.MessageEmbed()
    .setColor(client.config.EmColor)
    .setDescription('**Réagissez avec \📥 pour ouvrir un ticket !**')
    
    let embedSent = await embedChannel.send(embed)

    embedSent.react("📥")


}

module.exports.config = {
    name: "ticket",
    category: "moderation",
    usage: '{channel.ID} <.category name> <.ticket name>',
    stable: "❌ instable",
    description: "crée un embed de création de tickets",
}