const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('MENTION_EVERYONE')) return message.channel.send("vous devez avoir la permisison de \@everyone pour utiliser cette commande")

    let PollChannel = client.channels.cache.get(args[1]) || message.mentions.channels.first()
    if(!PollChannel) return message.channel.send("merci de préciser en premier argument le salon du sondage")

    let THATmemberInTHATchannelsGUILD = PollChannel.guild.member(message.author)

    if(!PollChannel.permissionsFor(THATmemberInTHATchannelsGUILD).has('SEND_MESSAGES')) {
        return message.channel.send("vous devez avoir la permission d'envoyer des messages dans ce salon")
    }

    if(!PollChannel.permissionsFor(PollChannel.guild.me).has('SEND_MESSAGES')) {
        return message.channel.send("Shimi doit avoir la permission d'envoyer des messages dans ce salon")
    }

    let PollArgs = message.content.trim().split(" .")

    let Obj1 = PollArgs[1]
    if(!Obj1) return message.channel.send("merci de saisir au moins deux objets pour le sondage")
    let Obj2 = PollArgs[2]
    if(!Obj2) return message.channel.send("merci de saisir au moins deux objets pour le sondage")
    let Obj3 = PollArgs[3]
    let Obj4 = PollArgs[4]
    let Obj5 = PollArgs[5]
    let FalseArgs = PollArgs[6]
    if(FalseArgs) return message.channel.send("la commande ne supporte que 5 objets.\n attention, les ' .' comptent toujours comme des objets.")

    let embed = new Discord.MessageEmbed()
    .setTitle("SONDAGE :")
    .setColor(client.config.EmColor)
    .addField(Obj1, "réagir avec 1️⃣")
    .addField(Obj2, "réagir avec 2️⃣")
    if(Obj3) embed.addField(Obj3, "réagir avec 3️⃣")
    if(Obj4) embed.addField(Obj4, "réagir avec 4️⃣")
    if(Obj5) embed.addField(Obj5, "réagir avec 5️⃣")
    embed.setFooter(`par ${message.author.username}`)
    embed.setThumbnail(message.author.avatarURL())
    var EmbedSent = await PollChannel.send(embed)
    EmbedSent.react('1️⃣')
    EmbedSent.react('2️⃣')
    if(Obj3) EmbedSent.react('3️⃣')
    if(Obj4) EmbedSent.react('4️⃣')
    if(Obj5) EmbedSent.react('5️⃣')

}

module.exports.config = {
    name: "poll",
    category: "utility",
    usage: '{channel} .{objet1} .{objet2} .<objet3> .<objet4> .<objet5>',
    stable: "✅ stable",
    description: "crée un sondage rapide avec les objets en choix",
}