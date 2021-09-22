const Discord = require("discord.js")
module.exports = (client, message) => {
    
    let args = message.content.trim().split(' ')

    const fs = require('fs')

    let JSONanniv = JSON.parse(fs.readFileSync('./database/json/annivLIST.json'))

    let user = message.mentions.users.first() || client.users.cache.get(args[1])
    if(!user) return message.channel.send(`l'utilisateur est introuvable`)

    let found = JSONanniv.find(x => x.ID === user.id)
  
    if(!found) return message.channel.send(`l'anniversaire de **${user.username}** n'a pas été trouvé !`)

    let embed = new Discord.MessageEmbed()
    .setColor(client.config.EmColor)
    .setDescription(`l'anniversaire de **${user.username}** est le : ${found.birthday}`)

    return message.channel.send(embed)

}