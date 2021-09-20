const Discord = require("discord.js")
module.exports = (client, message) => {

  console.log(`Bot connecté sur ${client.guilds.cache.size} serveurs, pour un total de ${client.users.cache.size} utilisateurs.`);
  
  let statusList = [
    `${client.prefix}help`,
    `Version ${client.config.version}`,
  ]

  setInterval(() => {

    let rstatus = statusList[Math.floor(Math.random() * statusList.length)]

    client.user.setActivity(rstatus, { type: 'WATCHING'})
    
  }, 3000);
  

}