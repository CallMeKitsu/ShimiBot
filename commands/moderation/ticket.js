const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    let NewArgs = message.content.trim().split('.');

    let channelID = args[1]
    let categoryName = NewArgs[1]
    let ticketEntry = NewArgs[2]

    if(!channelID) return message.channel.send(`veuillez saisir l'ID du salon de création de tickets`)
    if(!categoryName) categoryName = "support"
    if(!ticketEntry) ticketEntry = `ticket`

    let ticketChannel = message.mentions.channels.first() || client.channels.cache.get(channelID)

    let TrueCategoryFound = message.guild.channels.cache.find(c => c.name == categoryName && c.type == "category")

    if(!ticketChannel) return message.channel.send(`le salon qui correspond à l'ID ${channelID} n'existe pas`)

    if(!TrueCategoryFound) {
        message.guild.channels.create(categoryName, {
                type: 'category',
                position: 1,
                permissionOverwrites: [
                    {
                        id: message.guild.id,
                        allow: ['VIEW_CHANNEL'],
                    }]
        })
    
    } else return;
    
    
    x = TrueCategoryFound.children.size + 1
    let FinallyTicketName = `${ticketEntry}${x}`

    message.channel.send(FinallyTicketName)

    console.log(channelID, FinallyTicketName, x, TrueCategoryFound.name, ticketChannel.name, error)
    
  //  message.guild.channels.create(ticketName, {
  //      type: 'text',
  //      parent: TrueCategoryFound,
  //      permissionOverwrites: [
  //          {
  //              id: message.guild.id,
  //              allow: ['VIEW_CHANNEL'],
  //          }]
  //  })



}

module.exports.config = {
    name: "ticket",
    category: "moderation",
    usage: '{channel.ID} <.category name> <.ticket name>',
    stable: "❌ instable",
    description: "crée un embed de création de tickets",
}