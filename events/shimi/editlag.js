const Discord = require("discord.js")
module.exports = (client, message) => {

    const fs = require('fs')
    const fsPROMISES = require('fs').promises

    let args = message.content.trim().split(/ +/g);

    let JSONlag = JSON.parse(fs.readFileSync('./database/json/lagLIST.json'))

    let found = JSONlag.find(x => x.ID === message.author.id)

    let VAR_ADDTIME = 0

    if(args[2].startsWith("+")) {
        VAR_ADDTIME = parseInt(args[2].trim().split('+')[1])
    }

    if(args[2].startsWith('-')) {
        VAR_ADDTIME = parseInt(args[2])
    }

    if(!args[2].startsWith("-") && !args[2].startsWith('+')) return message.channel.send('merci d\'utiliser - et + pour les décalages horaires !')
    
    if( Number.isNaN(VAR_ADDTIME) === true) return client.emit('invalidArg', message)

    message.channel.send(`votre décalage a bien été édité de : ${found.TimeAdd} à ${VAR_ADDTIME}`)

    const fileName = './database/json/lagLIST.json'

    for(var i = 0; i < JSONlag.length; i++) {
        if(JSONlag[i]['ID'] === message.author.id) {
            JSONlag[i].TimeAdd = VAR_ADDTIME
            break
        }
    }
        
    fs.writeFile(fileName, JSON.stringify(JSONlag, null, 4), function writeJSON(err) {
      if (err) return console.log(err);
    });
    
   
    


}