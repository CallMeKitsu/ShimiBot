const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    const fs = require('fs');

    const dir = `./database/renaw/`;
    
    fs.readdir(dir, (err, files) => {

    let x = Math.floor(Math.random() * files.length) + 1
    let renawIMG = new Discord.MessageAttachment(`./database/renaw/${x}.png`)
    
    let desc_artist = client.renawLIST['artists'][x - 1].name

    let embed = new Discord.MessageEmbed()
     .setColor(client.config.EmColor)
     .setTitle("RENAW :")
     .setURL("https://renaws.jimdofree.com/")
     .setDescription(`${message.author.username} a rencontré un renaw !!`)
     .attachFiles(renawIMG)
     .setImage(`attachment://${x}.png`)
     .setFooter(`Artwork fait par ${desc_artist} pour le RDR !`)
    message.channel.send(embed)
    
})}


module.exports.config = {
    name: "renaw",
    category: "social",
    usage: "",
    stable: "✅ stable",
    description: 'artworks du serveurs "Le Royaume des Renards"',
} 