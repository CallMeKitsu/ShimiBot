const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    let pfclist = [
        "👊",
        "✋",
        "✌️",
      ]
    
    let embed = new Discord.MessageEmbed()
      .setColor(client.config.EmColor)
      .setTitle("CHI FU MI :")
      .setDescription(`${message.author.username} a joué ${pfclist[Math.floor(Math.random() * pfclist.length)]}`)
    message.channel.send(embed)
       
}

module.exports.config = {
    name: "chifumi",
    category: "jeux",
    usage: "",
    stable: "✅ stable",
    description: "hum.. faire un chi fu mi..",
} 