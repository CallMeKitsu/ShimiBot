const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {
    
    let SocialCmdName = 'kiss'

    const fs = require('fs');

    const dir = `./database/${SocialCmdName}/`;
    
    fs.readdir(dir, (err, files) => {

        let x = Math.floor(Math.random() * files.length) + 1
        if(files.length <= 1) message.channel.send(`erreur de base de données. Merci de report avec ${client.config.prefix}report !`)
        let File = new Discord.MessageAttachment(`./database/${SocialCmdName}/${x}.gif`)
        let user = message.mentions.users.first()

        if(!user) SocialDescription =  `**${message.author.username}** t'embrasse tendrement..`
        if(user) SocialDescription =  `**${message.author.username}** embrasse tendrement ${user.toString()}..` 

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
    name: "kiss",
    category: "social",
    usage: "<@user>",
    stable: "✅ stable",
    description: "embrasse l'utilisateur mentionné",
}