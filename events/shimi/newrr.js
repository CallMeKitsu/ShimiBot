const Discord = require("discord.js")
const fs = require("fs")
const fsPROMISES = require('fs').promises
module.exports = (client, message, messageId, channelId, roleId, emoji) => {

    let fileName = './database/json/serverLIST.json'

    let JSONservers = JSON.parse(fs.readFileSync(fileName))

    let newRR = {
        messageId : messageId,
        channelId : channelId,
        emojiRolesPairs : [
            {"role": roleId, "emoji": emoji}
        ]
    }

    for(var i = 0; i < JSONservers.length; i++) {

        if(JSONservers[i]['ID'] === message.guild.id) {
            JSONservers[i].roleReact[JSONservers[i].roleReact.length] = newRR
            break
        }

    }
        
    fs.writeFile(fileName, JSON.stringify(JSONservers, null, 4), function writeJSON(err) {
      if (err) return console.log(err)
    })

}