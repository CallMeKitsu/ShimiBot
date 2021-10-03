const Discord = require('discord.js');
const fs = require("fs")
module.exports.run = async (client, message, args) => {

    let embed = new Discord.MessageEmbed()
    .setColor(client.config.EmColor)
    .setDescription(`pour soutenir le bot, vous pouvez voter [ici](${client.config.voteLink}) toutes les 12h !`)
    message.channel.send(embed)

}

module.exports.config = {
    name: "vote",
    category: "autres",
    usage: "",
    stable: "❌ instable",
    description: "soutenir le bot !",
    countdown: 10
}