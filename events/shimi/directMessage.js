const Discord = require("discord.js")
module.exports = (client, message) => {

    if(message.content.startsWith("?")) {

        let QuestionArgs = message.content.trim().split("?");

        let questionContent = QuestionArgs.slice(1).join(" ")

        if(!questionContent) return message.author.send("merci de poser une question valide")
        if(questionContent.length < 20) return message.author.send("votre question doit être de plus de 20 charactères")

        let embed = new Discord.MessageEmbed()

        .setColor(client.config.EmColorGreen)
        .addField(`QUESTION :`, `${questionContent}?`)
        .setFooter(`par ${message.author.tag}`)
        .setThumbnail(message.author.avatarURL())

        var reportChan = client.channels.cache.get(client.config.reportChan)

        reportChan.send(embed)
        

    } if(message.content.startsWith(">")) {
        return message.author.send("les commandes ne fonctionnent pas en mp.")
    }

    
}