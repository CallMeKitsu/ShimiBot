const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    const fs = require('fs')

    const categoryList = fs.readdirSync('./commands')

    let commandName = args[1]

    if(!commandName) {

        let embed = new Discord.MessageEmbed()
        .setTitle("HELP :")
        .setURL("https://callmekitsu.jimdofree.com/projets/shimi/")
        .setColor(client.config.EmColor)
        .setThumbnail(client.user.avatarURL())
        .setDescription(`liste des commandes du bot !\nPour plus d'informations sur une commande, tapez :\n\n\`${client.config.prefix}help <command_name>\`\n\nlien du site officiel : https://bit.ly/CallMeKitsuShimi\nremerciements avec \`${client.config.prefix}credits\` ou sur le site /credits\n `)
        .setFooter(`dev par ${client.config.devBy}`)
        let x = 0
        for(const category of categoryList) {  
            embed.addField(
                `\\${client.config.CatEmoji[x]} ${category} :`,
                `${client.commands.filter(cat => cat.config.category === category.toLowerCase()).map(cmd => cmd.config.name).join(', ')}`
            )
            x = x + 1
        }

        message.channel.send(embed)
    
    } else {

        if(commandName === "filter") return client.emit("filterHelp", message)

        const command = client.commands.get(commandName)
        if(!command) return message.channel.send(`la commande "${commandName}" n'existe pas.`);

        let embed = new Discord.MessageEmbed()
        .setTitle(`HELP : ${command.config.name.toUpperCase()}`)
        .setURL("https://callmekitsu.jimdofree.com/projets/shimi/")
        .setColor(client.config.EmColor)
        .setThumbnail(client.user.avatarURL())
        .addField(`Statut :`, `${command.config.stable}`, true)
        .addField(`Categorie :`, `${command.config.category}`, true)
        .addField(`Usage :`, `\`${client.config.prefix}${command.config.name} ${command.config.usage}\``)
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