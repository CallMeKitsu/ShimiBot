const Discord = require("discord.js")
module.exports = (client, message) => {

const fs = require("fs")
const fsPROMISES = require('fs').promises

let args = message.content.trim().split(/ +/g);

let JSONlag = JSON.parse(fs.readFileSync('./database/json/lagLIST.json'));

let varEXIST = JSONlag.find(x => x.ID === message.author.id)

if(varEXIST !== undefined) return client.emit('editlag', message)

let VAR_ADDTIME = 0

if(args[2].startsWith("+")) {
    VAR_ADDTIME = parseInt(args[2].trim().split('+')[1])
}

if(args[2].startsWith('-')) {
    VAR_ADDTIME = parseInt(args[2])
}

if(!args[2].startsWith("-") && !args[2].startsWith('+')) return message.channel.send('merci d\'utiliser - et + pour les décalages horaires !')
    
if( Number.isNaN(VAR_ADDTIME) === true) return client.emit('invalidArg', message)

async function NewLag() {

    const filename = './database/json/lagLIST.json';

    await fsPROMISES.writeFile(filename, JSON.stringify(JSONlag));
  
    const newLAG = {
        ID: message.author.id,
        TimeAdd: VAR_ADDTIME
    }
  
    const file = await fsPROMISES.readFile(filename);
    JSONlag = JSON.parse(file);
    JSONlag.push(newLAG);
  
    await fsPROMISES.writeFile(filename, JSON.stringify(JSONlag, null, 4))

}

NewLag()

message.channel.send('merci !')

}