const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    let type = args[1]

    if(!type) return message.channel.send('choisissez : `>underrated waifu` ou `>underrated husbando` ?')
    
    const fs = require('fs');
    
    if(type === "husbando" || type === "h") {

        const dir = `./database/underrated/boys/`
    
        fs.readdir(dir, (err, files) => {

            let x = Math.floor(Math.random() * files.length) + 1
        
            let boyFile = new Discord.MessageAttachment(`./database/underrated/boys/${x}.png`)

            let embed = new Discord.MessageEmbed()
            .setTitle("HUSBANDO :")
            .setColor(client.config.EmColor)
            .setDescription(
                `nom : ${client.underLIST['boys'][x - 1].name}\nanime : ${client.underLIST['boys'][x - 1].anime}`
            )
            .attachFiles(boyFile)
            .setImage(`attachment://${x}.png`)
        
            message.channel.send(embed)
        }) // fin du readdir BOYS

    }
    if(type === "waifu" || type === "w") {

        const dir = `./database/underrated/girls/`
    
        fs.readdir(dir, (err, files) => {

            let x = Math.floor(Math.random() * files.length) + 1
        
            let girlFile = new Discord.MessageAttachment(`./database/underrated/girls/${x}.png`)

            let embed = new Discord.MessageEmbed()
            .setTitle("WAIFU :")
            .setColor(client.config.EmColor)
            .setDescription(
                `nom : ${client.underLIST['girls'][x - 1].name}\nanime : ${client.underLIST['girls'][x - 1].anime}`
            )
            .attachFiles(girlFile)
            .setImage(`attachment://${x}.png`)
        
            message.channel.send(embed)
        }) // fin du readdir BOYS

    }
    if(type !== "waifu" && type !== "w" && type !== "husbando" && type !== "h") return message.channel.send("merci d'utiliser un argument correct de la commande.")
    
}

module.exports.config = {
    name: "underrated",
    category: "animes",
    usage: "[ waifu / husbando ]",
    stable: "✅ stable",
    description: "vous présente votre nouvelle / nouveau waifu / hubsando sous-coté(é) !",
} 