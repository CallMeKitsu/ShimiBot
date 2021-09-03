const Discord = require("discord.js")
module.exports = (client, message) => {

    let args = message.content.trim().split(" ")

    let foot = args[2].trim().split("'")[0]
    if(!foot) return message.channel.send('objet manquant pour l\'utilisation de la commande')

    let inch = message.content.trim().split('"')[0].split("'")[1]
    if(!inch) return message.channel.send('objet manquant pour l\'utilisation de la commande')

    let input1 = foot
    let input2 = inch

    let output1 = input1 /  3.281
    let output2 = input2 /  39.37

    console.log(output1, output2)
    
    if(Number.isNaN(output1)) return message.channel.send('l\'objet doit être un nombre')
    if(Number.isNaN(output2)) return message.channel.send('l\'objet doit être un nombre')

    let embed = new Discord.MessageEmbed()
    .setColor(client.config.EmColor)
    .setDescription("```Méthode : tall > m```")
    .addField(`${input1}' ${input2}" tall =`, `${Math.round((output1 + output2 + Number.EPSILON) * 100) / 100}m de taille`)

    message.channel.send(embed)

}

module.exports.props = {
    type: "divers",
    name: "tall-m"
}