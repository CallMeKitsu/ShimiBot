const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    let GENRE = args[1]
    if(!GENRE) GENRE = "all"
    if(GENRE === "all") return message.channel.send("le ALL est en developpement.")
    if(!client.suggestLIST.list.includes(GENRE)) return message.channel.send(`le genre musical ${GENRE} n'existe pas`)
    if (!client.suggestLIST[GENRE]) return (`le genre ${GENRE} existe mais n'est pas dans la liste, merci de ${client.prefix}report cette erreur.`)
    let x = Math.floor(Math.random() * client.suggestLIST[GENRE].length)

    let title = client.suggestLIST[GENRE][x].name
    let artist = client.suggestLIST[GENRE][x].artist
    let link = client.suggestLIST[GENRE][x].link

    if(!title) return message.channel.send(`erreur de base de donnée (title), merci de ${client.prefix}report cette erreur`)
    if(!artist) return message.channel.send(`erreur de base de donnée (artist), merci de ${client.prefix}report cette erreur`)
    if(!link) return message.channel.send(`erreur de base de donnée (link), merci de ${client.prefix}report cette erreur`)

    let embed = new Discord.MessageEmbed()
    .setColor(client.config.EmColor)
    .setURL('https://callmekitsu.jimdofree.com/projets/shimi/')
    .setDescription(`**${title}** - *${artist}*`)
    .setFooter('réagissez avec 🔗 pour le lien !')

    let SentSuggest = await message.channel.send(embed)
    SentSuggest.react('🔗')

        SentSuggest.awaitReactions((reaction, user) => user.id !== client.user.id && (reaction.emoji.name == '🔗'),
        { max: 1, time: 30000 }).then(collected => {

        if (collected.first().emoji.name == '🔗') {

            message.author.send(client.suggestLIST[GENRE][x].link)

        } else return

    })

}

module.exports.config = {
    name: "suggest",
    category: "musique",
    usage: "<[ classique / jazz ]>",
    stable: "📦 empty",
    description: "des suggestions musicales triées par genre",
} 