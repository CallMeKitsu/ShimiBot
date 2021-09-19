const Discord = require("discord.js")
module.exports = (client, message) => {

    const fs = require('fs')

    let JSONlag = JSON.parse(fs.readFileSync('./database/json/lagLIST.json'))

    let user = message.mentions.users.first()

    let found = JSONlag.find(x => x.ID === user.id)
  
    if(!found) return message.channel.send(`l'heure de **${user.username}** n'a pas été trouvé !`)

    let maintenant = new Date(Date.now())

    let MS_UDATE = maintenant.getTime() + (found.TimeAdd * 3600000)

    let USER_DATE = new Date(MS_UDATE)

    let USER_TIME = `${USER_DATE.getHours()}:${maintenant.getMinutes()}`

    let embed = new Discord.MessageEmbed()
    .setColor(client.config.EmColor)
    .setDescription(`pour **${user.username}**, il est ${USER_TIME}`)

    return message.channel.send(embed)

}