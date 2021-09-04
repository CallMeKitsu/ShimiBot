const Discord = require("discord.js")
module.exports = (client, message) => {

    const fs = require('fs')

    let JSONanniv = JSON.parse(fs.readFileSync('./database/json/annivLIST.json'))

    let user = message.mentions.users.first()

    let found = JSONanniv.find(x => x.ID === user.id)
  
    if(!found) return message.channel.send(`l'anniversaire de **${user.username}** n'a pas été trouvé !`)

    let embed = new Discord.MessageEmbed()
    .setColor(client.config.EmColor)
    .setDescription(`l'anniversaire de **${user.username}** est le : ${found.birthday}`)

    return message.channel.send(embed)

}