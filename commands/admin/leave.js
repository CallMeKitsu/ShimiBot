const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

      let LeavedServerId = args[1]
      if(!args[1]) return message.channel.send("veuillez entrer un ID de serveur à quitter.")
      let server = client.guilds.cache.get(LeavedServerId)
      if(!server) return message.channel.send(`le serveur correspondant à l'ID ${LeavedServerId} n'existe pas.`)
      
      server.leave()
      .catch(err => {
      console.log(`erreur : ${err.message}`); })

      message.channel.send(`le serveur ${client.guilds.cache.get(LeavedServerId).name} a bien été quitté.`)
    
}
module.exports.config = {
    name: "leave",
    category: "admin",
    usage: "{guild.ID}",
    stable: "✅ stable",
    description: "quitte le serveur correspondant",
} 