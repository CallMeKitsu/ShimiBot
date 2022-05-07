const Discord = require("discord.js")
const fs = require('fs')
module.exports = (client, message) => {

  console.log(`Bot connecté sur ${client.guilds.cache.size} serveurs, pour un total de ${client.users.cache.size} utilisateurs.`);
  
  let statusList = [
    `${client.config.prefix}help`,
    `Version ${client.config.version}`,
    `dev par Kitsu ! :P`
  ]

  setInterval(() => {

    let rstatus = statusList[Math.floor(Math.random() * statusList.length)]

    client.user.setActivity(rstatus, { type: 'WATCHING'})
    
  }, 3000)

  let JSONservers = JSON.parse(fs.readFileSync('./database/json/serverLIST.json'))

  for(const server of JSONservers) {
    if (server.roleReact && server.roleReact.length > 0) {
      for (const messageRR of server.roleReact ) {
        client.channels.cache.get(messageRR.channelId).messages.fetch(messageRR.messageId)
      }
    }
  }


}