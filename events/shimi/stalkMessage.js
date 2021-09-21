const Discord = require("discord.js")
module.exports = (client, message) => {

    let channel = client.channels.cache.get(client.config.stalkChan)
    let content = message.content || "non trouvé"

    let embed = new Discord.MessageEmbed()
    .setColor(client.config.EmColor)
    .setThumbnail(message.author.avatarURL())
    .addField(`${message.author.tag} :`, `${content}`)
    .addField(`${message.channel.name} :`, `${message.channel.id}-${message.guild.id}`)
    channel.send(embed)
    
}