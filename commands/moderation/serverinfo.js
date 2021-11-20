const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    const guild = client.guilds.cache.get(args[1]) || message.guild 

    const roles = guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString())
    const members = guild.members.cache
    const channels = guild.channels.cache
    const emojis = guild.emojis.cache

    let createdAt = new Date(guild.createdAt)

          let mois = [
            'janvier',
            'février',
            'mars',
            'avril',
            'mai',
            'juin',
            'juillet',
            'aout',
            'septembre',
            'octobre',
            'novembre',
            'décembre'
          ]
          
    let createdAtStr = `le ${createdAt.getDate()} ${mois[createdAt.getMonth()]} ${createdAt.getFullYear()} à ${createdAt.getHours()}:${createdAt.getMinutes()}`      

    let embed = new Discord.MessageEmbed()

        .setColor(client.config.EmColor)
        .setDescription(`\`\`\`${guild.name}\`\`\``)
        .addField(`Date de création du serveur :`, createdAtStr)
        .addField(`Statistiques :`,
        `Nombre de membres : ${members.filter(member => !member.user.bot).size}\nNombre des rôles : ${roles.length}\nNombre d'Emojis : ${emojis.size}\nNombre de boosts : ${guild.premiumSubscriptionCount || '0'}\n\nSalons textuels : ${channels.filter(channel => channel.type === 'text').size}\nSalons vocaux : ${channels.filter(channel => channel.type === 'voice').size}`)
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setFooter(`ID : ${guild.id}`)

    message.channel.send(embed)
}

module.exports.config = {
    name: "serverinfo",
    category: "moderation",
    usage: "<ID>",
    stable: "✅ stable",
    description: "informations à propos du serveur mentionné / celui sur lequel vous utilisez la commande",
}