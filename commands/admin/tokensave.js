const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

  // >tokensave TOKEN 4   

    let newToken = args[1]
    if(!newToken) return message.channel.send("merci d'envoyer un token")
    let x = args[2]
    if(!x) return message.channel.send('merci de saisir un nombre objet')
    let newTokenName = args.slice(3).join(" ")
    if(!newTokenName) newTokenName === "null"


    const fs = require("fs")

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
      } // fonction read

    jsonReader("./database/json/tokenLIST.json", (err, JSONtokenLIST) => {
        if (err) {
          console.log("Error reading file: ", err);
          return;
        }

        JSONtokenLIST['tokens'][x].get = newToken
        JSONtokenLIST['tokens'][x].name = newTokenName

        fs.writeFile("./database/json/tokenLIST.json", JSON.stringify(JSONtokenLIST, null, 2), err => {
          if (err) { 
            console.log("Error writing file:", err);
            message.channel.send("erreur lors de l'écriture : erreur dans les logs.")
        }});
      });

      message.channel.send(`token sauvegardé en tant que : ${newTokenName} à l'emplacement ${x}`)
      message.delete()

}






module.exports.config = {
    name: "tokensave",
    category: "admin",
    usage: "{token} {nombre} {nom}",
    stable: "✅ stable",
    description: "sauvegarde le token sous un nom",
} 