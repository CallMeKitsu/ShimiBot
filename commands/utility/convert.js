const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    const fs = require('fs')

    const eventlist = fs.readdirSync('./events/convert')

    let embed = new Discord.MessageEmbed()
    .setColor(client.config.EmColor)
    .setDescription("```>convert <method> {obj1}```")
    .setThumbnail(client.user.avatarURL())

    let ALL_EVENTS = eventlist.map(x => x.toLowerCase().split(".")[0]).join(', ')

    embed.addField('Méthodes :', ALL_EVENTS)

    if(!args[1]) message.channel.send(embed)
    if(!eventlist.includes(args[1] + ".js") && args[1] !== undefined) return message.channel.send('méthode inexistante.\nutilisez la commande suggestion pour la proposer')
    else client.emit(args[1], message)

}

module.exports.config = {
    name: "convert",
    category: "utility",
    usage: '{method} .{objet1} .{objet2}',
    stable: "✅ stable",
    description: "convertit des valeurs selon une méthode\n!! méthodes : `>convert` pour les afficher",
}