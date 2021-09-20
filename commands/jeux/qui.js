const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {
    
    let randomMember = message.guild.members.cache.filter(m => m.presence.status !== 'offline' && !m.user.bot).random()
    
    if(!randomMember) return message.channel.send('erreur lors de la création de la liste de membres')
    if(!args[1]) return message.channel.send(`commande sans arguments, utilisez ${client.prefix}help qui pour plus d'informations`)

    let NewArgs = args.slice(1).join(" ").trim().split("?")[0]

    if(!NewArgs) return message.channel.send(`commande sans arguments, utilisez ${client.prefix}help qui pour plus d'informations`)

    message.channel.send(`**${randomMember.user.username}** ${NewArgs}!`)

}

module.exports.config = {
    name: "qui",
    category: "jeux",
    usage: "{fait de la corde à sauter à 23:45 ?}",
    stable: "✅ stable",
    description: "donnez-nous des noms !",
}