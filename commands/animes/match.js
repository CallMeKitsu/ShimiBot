const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    if(!args[1]) return client.emit('twoMentionsNeeded', message)
    if(!args[2]) return client.emit('twoMentionsNeeded', message)

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
    if(!imageGirl) return client.emit('databaseError', message)
    let imageBoy = {files : [ `./database/match/hetero/${x}_(b).jpg`]}
    if(!imageBoy) return client.emit('databaseError', message)

    let userGirl = GetUserByMention(args[1])
    if(!userGirl) return client.emit('invalidUser', message)
    if(userGirl.bot) return client.emit('mentionsBot', message)

    let userBoy = GetUserByMention(args[2])
    if(!userBoy) return client.emit('invalidUser', message)
    if(userBoy.bot) return client.emit('mentionsBot', message)

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