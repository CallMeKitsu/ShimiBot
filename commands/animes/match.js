const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    if(!args[1]) return message.channel.send("merci de mentionner deux personnes !")
    if(!args[2]) return message.channel.send("merci de mentionner deux personnes !")

    function GetUserByMention(mention) {
    
        if (mention.startsWith('<@') && mention.endsWith('>')) {
            mention = mention.slice(2, -1);
    
            if (mention.startsWith('!')) {
                mention = mention.slice(1);
            }
    
            return client.users.cache.get(mention);
        }
    }

    let x = Math.floor(Math.random() * 10) + 1

    let imageGirl = {files : [ `./database/match/hetero/${x}_(g).jpg`]}
    if(!imageGirl) message.channel.send(`erreur de base de données. Merci de report avec ${client.config.prefix}report !`)
    let imageBoy = {files : [ `./database/match/hetero/${x}_(b).jpg`]}
    if(!imageBoy) message.channel.send(`erreur de base de données. Merci de report avec ${client.config.prefix}report !`)

    let userGirl = GetUserByMention(args[1]) // définir Girl
    if(!userGirl) return message.channel.send("mentions invalides.") // si pas de mentions correctes

    let userBoy = GetUserByMention(args[2]) // définir Boy
    if(!userBoy) return message.channel.send("mentions invalides.") // si pas de mentions correctes

    userGirl.send(imageGirl)
    setTimeout(() => { userGirl.send(`voilà ta pp avec ${userBoy.username} ! ❤️`) }, 1000)
    
    userBoy.send(imageBoy)
    setTimeout(() => { userBoy.send(`voilà ta pp avec ${userGirl.username} ! ❤️`) }, 1000)
    

    message.channel.send("vos pp sont envoyées en messages privés !")

}

module.exports.config = {
    name: "match",
    category: "animes",
    usage: "@girl @boy",
    stable: "✅ stable",
    description: "envoie aux utilisateurs mentionnés des Pps liées",
    cooldown: 10
} 