const Discord = require("discord.js")
module.exports = (client, message) => {

    let objARGS = message.content.trim().split(" ")

    if(!objARGS[2]) return message.channel.send(`vous devez saisir en 2 ème argument : {nombre de jours}j (0 est valable)`)
    if(!objARGS[3]) return message.channel.send(`vous devez saisir en 3 ème argument : {nombre d'heures}h (0 est valable)`)
    if(!objARGS[4]) return message.channel.send(`vous devez saisir en 4 ème argument : {nombre de minutes}min`)

    if(!objARGS[2].endsWith("j")) return message.channel.send(`vous devez notifier "j" à la fin du nombre de jours`)
    if(!objARGS[3].endsWith("h")) return message.channel.send(`vous devez notifier "h" à la fin du nombre d'heures`)
    if(!objARGS[4].endsWith("min")) return message.channel.send(`vous devez notifier "min" à la fin du nombre de minutes`)

    let jours = objARGS[2].trim().split("j")[0]
    let heures = objARGS[3].trim().split("h")[0]
    let minutes = objARGS[4].trim().split("min")[0]

    if(jours < 0) return message.channel.send("le nombre de jours ne peut être négatif")
    if(heures < 0) return message.channel.send("le nombre d'heures ne peut être négatif")
    if(minutes <= 0) return message.channel.send("le nombre de minutes ne peut être négatif ni nul")

    let input = `${jours}j ${heures}h ${minutes}min`

// ==========================================================

    function GetMsbyForm(SetDays, SetHours, SetMinutes) {

        let MSdays = SetDays * 86400000   
        let MShours = SetHours * 3600000  
        let MSminutes = SetMinutes * 60000 

        return MSdays + MShours + MSminutes

    } 

// ==========================================================

    let output = GetMsbyForm(jours, heures, minutes)

    if(Number.isNaN(output)) return message.channel.send(`vous devez saisir des nombres valides comme arguments de temps.`)

    let embed = new Discord.MessageEmbed()
    .setColor(client.config.EmColor)
    .setDescription("```Méthode : Time > Ms```")
    .addField(`${input} =`, `${output} milliseconde(s)`)

    message.channel.send(embed)

}

module.exports.props = {
    type: "time",
    name: "time-ms"
}