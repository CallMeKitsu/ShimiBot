const Discord = require('discord.js');
const fs = require("fs")
module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Vous devez avoir les permissions de Gérer les rôles')

    let JSONservers = JSON.parse(fs.readFileSync("./database/json/serverLIST.json"))

    if(!args[1]) return client.emit('invalidArg', message)
    if(args[1].length > 7) return message.channel.send('le préfixe doit être plus court que 7 caractères !')
   
    let found = JSONservers.find(x => x.ID === message.guild.id)
  
    if(!found) return client.emit('addServer', message)

    async function EditPrefix() {
        const fileName = "./database/json/serverLIST.json"

        for(var i = 0; i < JSONservers.length; i++) {
            if(JSONservers[i]['ID'] === message.guild.id) {
                JSONservers[i].CustomPrefix = args[1]
                break
            }
        }
            
        fs.writeFile(fileName, JSON.stringify(JSONservers, null, 4), function writeJSON(err) {
          if (err) return console.log(err);
        });
    }

    if(found) EditPrefix()

    message.channel.send(`le préfixe sur ce serveur est maintenant ${found.CustomPrefix} !`)
}

module.exports.config = {
    name: "prefix",
    category: "autres",
    usage: "{prefix}",
    stable: "✅ stable",
    description: "change le préfixe du serveur",
    countdown: 10
}