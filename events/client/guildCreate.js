const Discord = require("discord.js")
module.exports = (client, guild) => {

    let channel = guild.systemChannel || guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
   
    let embed = new Discord.MessageEmbed()
    .setColor(client.config.EmColor)
    .setThumbnail(client.user.avatarURL())
    .setDescription(`**Merci d'avoir invité ${client.user.toString()} !**\n\nSon préfixe est \`${client.prefix}\`, et sa commande d'aide est \`${client.prefix}help\` ;3\n\nPour plus d'informations, \`${client.prefix}info\` ou \`${client.prefix}credits\` !`)
    .setFooter(client.users.cache.get(client.config.admin2).tag)

    channel.send(embed)


}