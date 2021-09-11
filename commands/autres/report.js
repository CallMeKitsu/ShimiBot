const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    let reportChan = client.channels.cache.get(client.config.reportChan)
    let link = "https://github.com/CallMeKitsu/ShimiBot/issues/new"
    let label = "erreur"
    let admin = client.users.cache.get(client.config.admin)

    let embed = new Discord.MessageEmbed()
    .setColor(client.config.EmColor)
    .setDescription("vous avez trouvé une erreur ?")
    .addField("faites-en un rapport ici :", link)
    .addField("merci d'utiliser :", `le label "${label}" disponible à droite !`)
    .addField(`Serveur de Support :`, `[invitation permanente](${client.config.SupUrl})`)
    message.channel.send(embed)

    var ping = await reportChan.send(admin.toString())
    ping.delete()
    reportChan.send('new report')

}

module.exports.config = {
    name: "report",
    category: "autres",
    usage: "",
    stable: "✅ stable",
    description: "envoie un rapport de bug à l'administrateur",
    cooldown: 3600
}