const Discord = require("discord.js")
module.exports = (client, message) => {

    let objARGS = message.content.trim().split(" ")
    if(!objARGS[2]) return message.channel.send('objet manquant pour l\'utilisation de la commande')

    let input = objARGS[2]

    let output = input * 100
    
    if(Number.isNaN(output)) return message.channel.send('l\'objet doit être un nombre')

    let embed = new Discord.MessageEmbed()
    .setColor(client.config.EmColor)
    .setDescription("```Méthode : L > cl```")
    .addField(`${input} litre(s) =`, `${output} centilitre(s)`)

    message.channel.send(embed)

}

module.exports.props = {
    type: "volume",
    name: "l-cl"
}