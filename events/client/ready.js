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

  setInterval(() => {

    let StableArray = client.commands.filter(stb => stb.config.stable === "✅ stable").map(cmd => cmd.config.name)

    let JSONdata = JSON.parse(fs.readFileSync('../../html/shimi.web/ress/sample.json'))
    const fileName = '../../html/shimi.web/ress/sample.json'

    JSONdata.servers = client.guilds.cache.size
    JSONdata.users = client.users.cache.size
    JSONdata.channels = client.channels.cache.size
    JSONdata.commands = StableArray.length
        
    fs.writeFile(fileName, JSON.stringify(JSONdata, null, 4), function writeJSON(err) {
      if (err) return console.log(err);
    });
    
  }, 60000)

  

}