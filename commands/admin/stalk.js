const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    
  const fs = require("fs")

  let JSONconfig = JSON.parse(fs.readFileSync('./config.json'))

  let StalkVARIABLE = JSONconfig.stalkVar
  let StalkCHANNEL = JSONconfig.stalkChan

  if(!args[1]) return message.channel.send("envoyez soit <on> soit <off>")

  if(args[1] === "on") StalkVARIABLE = "on"
  if(args[1] === "off") StalkVARIABLE = "off"

  if(args[1] === "id") {
    let channel = client.channels.cache.get(args[1]) || message.mentions.channels.first()
    if(!channel) return message.channel.send('merci de préciser le salon')
    StalkCHANNEL = channel.id
  }

  if(args[1] !== "on" && args[1] !== "off" && args[1] !== "id") return message.channel.send("envoyez soit <on> soit <off>")


  const fileName = './config.json'

  JSONconfig.stalkVar = StalkVARIABLE
  JSONconfig.stalkChan = StalkCHANNEL
        
  fs.writeFile(fileName, JSON.stringify(JSONconfig, null, 2), function writeJSON(err) {
    if (err) return console.log(err);
  });

}

module.exports.config = {
    name: "stalk",
    category: "admin",
    usage: "[ on / off ] [id] <channelID>",
    stable: "✅ stable",
    description: "active ou désactive la fonction de stalk",
}