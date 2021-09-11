const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    let reportChan = client.channels.cache.get(client.config.reportChan)
    let link = "https://github.com/CallMeKitsu/ShimiBot/issues/new"
    let label = "question"
    let admin = client.users.cache.get(client.config.admin)

    let embed = new Discord.MessageEmbed()
    .setColor(client.config.EmColor)
    .setDescription("vous avez une question ?")
    .addField("posez-la nous ici :", link)
    .addField("merci d'utiliser :", `le label "${label}" disponible à droite !`)
    .addField(`Serveur de Support :`, `[invitation permanente](${client.config.SupUrl})`)
    message.channel.send(embed)

    var ping = await reportChan.send(admin.toString())
    ping.delete()
    reportChan.send("new question")

}

module.exports.config = {
    name: "question",
    category: "autres",
    usage: "",
    stable: "✅ stable",
    description: "posez-nous vos questions !",
    cooldown: 3600
}