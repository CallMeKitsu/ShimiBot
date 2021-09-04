const Discord = require("discord.js")
module.exports = (client, message) => {

const fs = require("fs")
const fsPROMISES = require('fs').promises

let args = message.content.trim().split(/ +/g);

let JSONanniv = JSON.parse(fs.readFileSync('./database/json/annivLIST.json'));

let varEXIST = JSONanniv.find(x => x.ID === message.author.id)

if(varEXIST !== undefined) return client.emit('editanniv', message)

var JOUR = args[1].trim().split('/')[0]
var MOIS = args[1].trim().split('/')[1]
var ANNEE = args[1].trim().split('/')[2]

if(!JOUR) return message.channel.send(`mauvaise utilisation de la commande, regardez le \`${client.config.prefix}help anniv\``)
if(!MOIS) return message.channel.send(`mauvaise utilisation de la commande, regardez le \`${client.config.prefix}help anniv\``)
if(!ANNEE) return message.channel.send(`mauvaise utilisation de la commande, regardez le \`${client.config.prefix}help anniv\``)

if(isNaN(JOUR) === true) return message.channel.send(`mauvaise utilisation de la commande, regardez le \`${client.config.prefix}help anniv\``)
if(isNaN(MOIS) === true) return message.channel.send(`mauvaise utilisation de la commande, regardez le \`${client.config.prefix}help anniv\``)
if(isNaN(ANNEE) === true) return message.channel.send(`mauvaise utilisation de la commande, regardez le \`${client.config.prefix}help anniv\``)

let VAR_ANNIV = `${JOUR}/${MOIS}/${ANNEE}`
    
async function NewAnniv() {
    const filename = './database/json/annivLIST.json';

    await fsPROMISES.writeFile(filename, JSON.stringify(JSONanniv));
  
    const newANNIV = {
        ID: message.author.id,
        birthday: VAR_ANNIV
     };
  
    const file = await fsPROMISES.readFile(filename);
    JSONanniv = JSON.parse(file);
    JSONanniv.push(newANNIV);
  
    await fsPROMISES.writeFile(filename, JSON.stringify(JSONanniv, null, 4));
}

NewAnniv()

message.channel.send('merci !')

}