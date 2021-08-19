const { Giveaway } = require('discord-giveaways')
const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    // structure : >giveaway CHANNELID 1j 2h 5min "item à gagner"condition"


    if (message.member.hasPermission('ADMINISTRATOR')) {
    function GetMsbyForm(SetDays, SetHours, SetMinutes) {

        let MSdays = SetDays * 86400000   
        let MShours = SetHours * 3600000  
        let MSminutes = SetMinutes * 60000 
    
        return MSdays + MShours + MSminutes
    
    } 

    if(!args[1]) return message.channel.send(`vous devez saisir en 1er argument un salon !`)
    if(!args[2]) return message.channel.send(`vous devez saisir en 2 ème argument : {nombre de jours}j (0 est valable)`)
    if(!args[3]) return message.channel.send(`vous devez saisir en 3 ème argument : {nombre d'heures}h (0 est valable)`)
    if(!args[4]) return message.channel.send(`vous devez saisir en 4 ème argument : {nombre de minutes}min (0 est valable)`)

    if(!args[2].endsWith("j")) return message.channel.send(`vous devez notifier "j" à la fin du nombre de jours`)
    if(!args[3].endsWith("h")) return message.channel.send(`vous devez notifier "h" à la fin du nombre d'heures`)
    if(!args[4].endsWith("min")) return message.channel.send(`vous devez notifier "min" à la fin du nombre de minutes`)

    const NewArgs = message.content.trim().split('.');

    let channelID = args[1]
    let days = args[2].split("j")[0].trim();
    let hours = args[3].split("h")[0].trim();
    let minutes = args[4].split("min")[0].trim();
    let MStime = GetMsbyForm(days, hours, minutes)
    let item = NewArgs[1]
    let FormatedTime = `${days} jours, ${hours} heures et ${minutes} minutes !`
    let GiveawayConditions = NewArgs[2]

    // handling


    if(Number.isNaN(MStime)) return message.channel.send(`vous devez saisir des nombres valides comme arguments de temps.`)
    if(!item) item = "item non défini."
    if(!GiveawayConditions) GiveawayConditions = "réagir avec 🦊 !"


    let embed = new Discord.MessageEmbed()
    .setTitle("GIVEAWAY :")
    .setURL('https://callmekitsu.jimdofree.com/projets/shimi/')
    .setColor(client.config.EmColor)
    .addField(`à gagner :`, item)
    .addField(`organisé par :`, `${message.author.username} (${message.author.toString()})`)
    .addField(`temps restant :`, FormatedTime)
    .addField(`conditions :`, GiveawayConditions)

    let GiveawayChannel = message.mentions.channels.first() || client.channels.cache.get(channelID)
    if(!GiveawayChannel) return message.channel.send(`vous devez saisir un salon correct.`)
        
    let embedSent = await GiveawayChannel.send(embed)
    
    embedSent.react("🦊")



    setTimeout(async () => {

        let PeopleReactions = await embedSent.reactions.cache.get("🦊").users.fetch()
        let WinList = PeopleReactions.array().filter(u => u.id !== client.user.id)

        if(WinList.length <= 0) return GiveawayChannel.send("le tirage ne peut être effectué qu'à partir de 2 participants !")
        let winKey = Math.floor(Math.random() * WinList.length)
        let winner = WinList[winKey]

        if(!winner) return GiveawayChannel.send(`erreur lors du tirage, merci de le signaler avec ${client.config.prefix}report !`)
        if(winner === undefined) return GiveawayChannel.send(`erreur lors du tirage, merci de le signaler avec ${client.config.prefix}report !`)

        let WinEmbed = new Discord.MessageEmbed()
        .setTitle("GIVEAWAY :")
        .setURL('https://callmekitsu.jimdofree.com/projets/shimi/')
        .setColor(client.config.EmColor)
        .setDescription(`Bravo ${winner.toString()}, tu as gagné : \n${item}`)

        embedSent.delete()
        GiveawayChannel.send(WinEmbed)

    }, MStime);
    
    } else return message.channel.send('cette commande requiert les permissions Administrateur du serveur.')
}

module.exports.config = {
    name: "giveaway",
    category: "moderation",
    usage: "{channel} Xj Xh Xmin <\"item à gagner\"conditions>",
    stable: "✅ stable",
    description: "commence un giveaway et mentionne son gagnant dans le channel précisé après le temps imparti",
    cooldown: 5
}