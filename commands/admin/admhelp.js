const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    const fs = require('fs')

    const categoryList = fs.readdirSync('./commands')

        let embed = new Discord.MessageEmbed()
        .setTitle("HELP ADMIN :")
        .setURL("https://callmekitsu.jimdofree.com/projets/shimi/")
        .setColor(client.config.EmColorRed)
        let x = 0
        for(const category of categoryList) {  

            embed.addField(
                `\\${client.config.CatEmoji[x]} ${category} :`,
                `${client.commands.filter(cat => cat.config.category === category.toLowerCase()).map(cmd => cmd.config.name).join(', ')}`
            )
            
             x = x + 1
        }

        message.channel.send(embed)
    
    

}


module.exports.config = {
name: "admhelp",
category: "admin",
usage: "<command_name> [filter] <stability>",
stable: "✅ stable",
description: "liste des commandes du bot (admin version)",
} 