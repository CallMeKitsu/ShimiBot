const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {
    
    let SocialCmdName = 'hug'

    const fs = require('fs');

    const dir = `./database/${SocialCmdName}/`;
    
    fs.readdir(dir, (err, files) => {

        let x = Math.floor(Math.random() * files.length) + 1
        if(files.length <= 1) message.channel.send(`erreur de base de données. Merci de report avec ${client.config.prefix}report !`)
        let File = new Discord.MessageAttachment(`./database/${SocialCmdName}/${x}.gif`)
        let user = message.mentions.users.first()

        if(!user) SocialDescription =  `**${message.author.username}** te fait un câlin !`
        if(user) SocialDescription =  `**${message.author.username}** fait un câlin à ${user.toString()} !` 

        if(!File) { 
            message.channel.send(`erreur de base de données. Merci de report avec ${client.config.prefix}report !`)
            return;
        }
    
        let embed = new Discord.MessageEmbed()
            .setColor(client.config.EmColor)
            .setDescription(SocialDescription)
            .attachFiles(File)
            .setImage(`attachment://${x}.gif`)
        message.channel.send(embed)

    })
}


module.exports.config = {
    name: "hug",
    category: "social",
    usage: "<@user>",
    stable: "✅ stable",
    description: "fait un câlin à l'utilisateur mentionné",
} 