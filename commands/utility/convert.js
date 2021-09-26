const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    const fs = require('fs')

    const eventlist = fs.readdirSync('./events/convert')

    const collec = new Discord.Collection()

    for(const event of eventlist) {
        const file = require(`../../events/convert/${event}`)
        const eventName = event.split(".")[0]
        collec.set(eventName, file)
    }


    let embed = new Discord.MessageEmbed()
    .setColor(client.config.EmColor)
    .setDescription("```>convert <method> {obj1}```")
    .setThumbnail(client.user.avatarURL())

    let TIME_EVENTS = collec.filter(x => x.props.type === "time").map(x => x.props.name).join(', ')
    let DIST_EVENTS = collec.filter(x => x.props.type === "distance").map(x => x.props.name).join(', ')
    let VOL_EVENTS = collec.filter(x => x.props.type === "volume").map(x => x.props.name).join(', ')
    let DIV_EVENTS = collec.filter(x => x.props.type === "divers").map(x => x.props.name).join(', ')
    
    if(!TIME_EVENTS) TIME_EVENTS = "aucune méthode"
    if(!DIST_EVENTS) DIST_EVENTS = "aucune méthode"
    if(!VOL_EVENTS) VOL_EVENTS = "aucune méthode"
    if(!DIV_EVENTS) DIV_EVENTS = "aucune méthode"

    embed.addField('Méthodes Diverses :', DIV_EVENTS)
    embed.addField('Méthodes Time :', TIME_EVENTS)
    embed.addField('Méthodes Distance :', DIST_EVENTS)
    embed.addField('Méthodes Volume :', VOL_EVENTS)

    if(!args[1]) message.channel.send(embed)
    if(!eventlist.includes(args[1] + ".js") && args[1] !== undefined) return message.channel.send('méthode inexistante.\nutilisez la commande suggestion pour la proposer')
    if(args[2] && args[2].length > 50) return message.channel.send(`l'objet à convertir doit faire moins de 50 caractères`) 
    else client.emit(args[1], message)

}

module.exports.config = {
    name: "convert",
    category: "utility",
    usage: '{method} <{objet1}>',
    stable: "📦 empty",
    description: "convertit des valeurs selon une méthode\n!! méthodes : `>convert` pour les afficher",
}