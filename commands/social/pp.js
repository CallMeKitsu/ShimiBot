const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    let user = message.mentions.users.first()
    if(!user) user = message.author

    let PPofUser = user.avatarURL({dynamic : true})
    if(!PPofUser) return message.channel.send("l'utilisateur mentionné n'a pas d'avatar discord.")

    let embed = new Discord.MessageEmbed()
    .setTitle(`PP de ${user.username.toUpperCase()}`)
    .setURL('')
    .setColor(client.config.EmColor)
    .setImage(PPofUser)
    message.channel.send(embed)
 
}

module.exports.config = {
    name: "pp",
    category: 'social',
    usage: "<@user>",
    stable: "✅ stable",
    description: "envoie la pp de l'utilisateur mentionné / vous",

}