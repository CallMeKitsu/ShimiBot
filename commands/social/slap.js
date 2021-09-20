const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {
    
    let SocialCmdName = 'slap'

    const fs = require('fs');

    const dir = `./database/${SocialCmdName}/`;
    
    fs.readdir(dir, (err, files) => {

        let x = Math.floor(Math.random() * files.length) + 1
        if(files.length <= 1) message.channel.send(`erreur de base de données. Merci de report avec ${client.prefix}report !`)
        let File = new Discord.MessageAttachment(`./database/${SocialCmdName}/${x}.gif`)
        let user = message.mentions.users.first()

        if(!user) SocialDescription =  `**${message.author.username}** te.. ***SLAP*** ! :'(`
        if(user) SocialDescription =  `**${message.author.username}** mets une grande gifle à ${user.toString()} :P` 

        if(!File) { 
            message.channel.send(`erreur de base de données. Merci de report avec ${client.prefix}report !`)
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
    name: "slap",
    category: "social",
    usage: "<@user>",
    stable: "✅ stable",
    description: "gifle l'utilisateur mentionné",
} 