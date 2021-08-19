const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    
    const fs = require("fs")

    if(args[1] === "on") { x = "on" }
    if(args[1] === "off") { x = "off" }
    if(!args[1]) { return message.channel.send("envoyez soit <on> soit <off>") }

    function jsonReader(filePath, cb) {
        fs.readFile(filePath, (err, fileData) => {
          if (err) {
            return cb && cb(err);
          }
          try {
            const object = JSON.parse(fileData);
            return cb && cb(null, object);
          } catch (err) {
            return cb && cb(err);
          }
        });
      }

    jsonReader("./config.json", (err, JSONconfig) => {
        if (err) {
          console.log("Error reading file: ", err);
          return;
        }

        if(args[2] === "id") { y = args[3] } else { y = JSONconfig.stalkChan }
        if(!y) { JSONconfig.stalkChan = JSONconfig.stalkChan}

        JSONconfig.stalkVar = x;
        JSONconfig.stalkChan = y;

        fs.writeFile("./config.json", JSON.stringify(JSONconfig, null, 2), err => {
          if (err) {
            console.log("Error writing file:", err);
            return message.channel.send(`erreur lors de l'écriture du fichier, erreur log dans la console.`)

          }
        });
      });
}

module.exports.config = {
    name: "stalk",
    category: "admin",
    usage: "[ on / off ] [id] <channelID>",
    stable: "✅ stable",
    description: "active ou désactive la fonction de stalk",
}