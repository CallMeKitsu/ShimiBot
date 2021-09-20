const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    const fs = require('fs')

    const categoryList = fs.readdirSync('./commands')

    let commandName = args[1]

    if(!commandName) {

        let embed = new Discord.MessageEmbed()
        .setColor(client.config.EmColor)
        .setThumbnail(client.user.avatarURL())
        .setDescription(`\`\`\`${client.prefix}help <command_name>\`\`\``)
        let x = 0
        for(const category of categoryList) {  

            if(client.categoryDisplay[category] === "true") {

            embed.addField(
                `\\${client.config.CatEmoji[x]} ${category} :`,
                `${client.commands.filter(cat => cat.config.category === category.toLowerCase()).map(cmd => cmd.config.name).join(', ')}`
            )
            
            } x = x + 1
        }

        message.channel.send(embed)
    
    } else {

        if(commandName === "filter") return client.emit("filterHelp", message)

        const command = client.commands.get(commandName)
        if(!command) return message.channel.send(`la commande "${commandName}" n'existe pas.`);

        let embed = new Discord.MessageEmbed()
        .setColor(client.config.EmColor)
        .setThumbnail(client.user.avatarURL())
        .addField(`Statut :`, `${command.config.stable}`, true)
        .addField(`Categorie :`, `${command.config.category}`, true)
        .addField(`Usage :`, `\`${client.prefix}${command.config.name} ${command.config.usage}\``)
        .addField(`Description :`, command.config.description)

        message.channel.send(embed)
        
    }

}


module.exports.config = {
    name: "help",
    category: "autres",
    usage: "<command_name> [filter] <stability>",
    stable: "✅ stable",
    description: "liste des commandes du bot",
} 