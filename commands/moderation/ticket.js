const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    // CHAN.ID_send_embed <.category name == support>

    let JSONservers = JSON.parse(fs.readFileSync('./database/json/serverLIST.json'))

    let found = JSONservers.find(x => x.ID === message.guild.id)

    if(!found) return client.emit("addServer", message)



    // ===========================================================
    
    let embedChannel = client.channels.cache.get(found.ticketChan)
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