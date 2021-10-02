const Discord = require('discord.js');
const fs = require("fs")
module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('Vous devez avoir les permissions de Gérer les rôles')
    if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send('Attention, Shimi n\'a pas les permissions de Gérer les rôles.')

    let JSONservers = JSON.parse(fs.readFileSync("./database/json/serverLIST.json"))

    if(!args[1]) return client.emit('invalidArg', message)

    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
    
    if(!role) return message.channel.send(`le rôle n'existe pas ou n'a pas été trouvé`)
   
    let found = JSONservers.find(x => x.ID === message.guild.id)
  
    if(!found) return client.emit('addServer', message)

    async function EditJoinRole() {
        const fileName = "./database/json/serverLIST.json"

        for(var i = 0; i < JSONservers.length; i++) {
            if(JSONservers[i]['ID'] === message.guild.id) {
                JSONservers[i].JoinRole = role.id
                break
            }
        }
            
        fs.writeFile(fileName, JSON.stringify(JSONservers, null, 4), function writeJSON(err) {
          if (err) return console.log(err);
        });
    }

    if(found && found.JoinRole === "") EditJoinRole()
    if(found && found.JoinRole !== "") EditJoinRole()

    message.channel.send('le rôle sera maintenant donné aux nouveaux arrivants !')
}

module.exports.config = {
    name: "joinrole",
    category: "moderation",
    usage: "@role",
    stable: "✅ stable",
    description: "donne le rôle mentionné à chaque nouveau membre",
    countdown: 10
}