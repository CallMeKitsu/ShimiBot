const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    let reportContent = args.slice(1).join(" ")
    let admin = client.users.cache.get(client.config.admin)

    if(!reportContent) {
        message.channel.send("le report doit être composé comme ceci : `>report message---https://image.png` ")
    }
    if(reportContent) {

        let NewArgs = message.content.trim().split("---");
        let reportLink = NewArgs[1]
        
        if(!reportLink) {

            let embed = new Discord.MessageEmbed()

                .setColor(client.config.EmColorRed)
                .addField(`REPORT :`, `${reportContent}`)
                .setFooter(`par ${message.author.tag} dans ${message.channel.name} : ${message.guild.id}`)
                .setThumbnail(message.author.avatarURL())

                var reportChan = client.channels.cache.get(client.config.reportChan)
                reportChan.send(embed)
                
                var ping = await reportChan.send(admin.toString())
                ping.delete()
        }

        if(reportLink) {

            if (reportLink.startsWith("http")) {

                if (reportLink.endsWith(".png")) {

                    let finalContent = reportContent.split("---")[0].trim();

                    let embed = new Discord.MessageEmbed()
                        .setColor(client.config.EmColorRed)
                        .addField(`REPORT :`, `${finalContent}`)
                        .setFooter(`par ${message.author.tag} dans ${message.channel.name} : ${message.guild.id}`)
                        .setImage(reportLink)
                        .setThumbnail(message.author.avatarURL())

                        var reportChan = client.channels.cache.get(client.config.reportChan)
                        reportChan.send(embed)

                        var ping = await reportChan.send(admin.toString())
                        ping.delete()


                    
                
                } else message.channel.send("le lien de l'image doit commencer par `http://` ou `https://` et finir par `.png`")
            } else message.channel.send("le lien de l'image doit commencer par `http://` ou `https://` et finir par `.png`")
        }
    }
}

module.exports.config = {
    name: "report",
    category: "autres",
    usage: "{message} <---screen.link.png>",
    stable: "✅ stable",
    description: "envoie un rapport de bug à l'administrateur",
    cooldown: 60
}