const Discord = require("discord.js")
module.exports = (client, message) => {

    const fs = require('fs')
    const fsPROMISES = require('fs').promises

    let args = message.content.trim().split(/ +/g);

    let JSONanniv = JSON.parse(fs.readFileSync('./database/json/annivLIST.json'))

    var JOUR = args[1].trim().split('/')[0]
    var MOIS = args[1].trim().split('/')[1]
    var ANNEE = args[1].trim().split('/')[2]

    if(!JOUR) return message.channel.send(`mauvaise utilisation de la commande, regardez le \`${client.prefix}help anniv\``)
    if(!MOIS) return message.channel.send(`mauvaise utilisation de la commande, regardez le \`${client.prefix}help anniv\``)
    if(!ANNEE) return message.channel.send(`mauvaise utilisation de la commande, regardez le \`${client.prefix}help anniv\``)

    if(isNaN(JOUR) === true) return message.channel.send(`mauvaise utilisation de la commande, regardez le \`${client.prefix}help anniv\``)
    if(isNaN(MOIS) === true) return message.channel.send(`mauvaise utilisation de la commande, regardez le \`${client.prefix}help anniv\``)
    if(isNaN(ANNEE) === true) return message.channel.send(`mauvaise utilisation de la commande, regardez le \`${client.prefix}help anniv\``)

    let VAR_ANNIV = `${JOUR}/${MOIS}/${ANNEE}`

    let found = JSONanniv.find(x => x.ID === message.author.id)

    message.channel.send(`votre anniversaire a bien été édité de : ${found.birthday} à ${VAR_ANNIV}`)

    const fileName = './database/json/annivLIST.json'

    for(var i = 0; i < JSONanniv.length; i++) {
        if(JSONanniv[i]['ID'] === message.author.id) {
            JSONanniv[i].birthday = VAR_ANNIV
            break
        }
    }
        
    fs.writeFile(fileName, JSON.stringify(JSONanniv, null, 4), function writeJSON(err) {
      if (err) return console.log(err);
    });
    
   
    


}