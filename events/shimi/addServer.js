const Discord = require("discord.js")
const fs = require("fs")
const fsPROMISES = require('fs').promises
module.exports = (client, message) => {

    let JSONservers = JSON.parse(fs.readFileSync("./database/json/serverLIST.json"))

    async function NewServer() {
        const filename = "./database/json/serverLIST.json"
    
        await fsPROMISES.writeFile(filename, JSON.stringify(JSONservers));
      
        const newSERVER =     {
            ID : message.guild.id,
            name: message.guild.name,
            CustomPrefix : "",
            ticketChan : "",
            JoinRole : "",
            roleReact : [],
            blankKey1 : "",
            blankKey2 : "",
            blankKey3 : "",
            blankKey4 : "",
            blankKey5 : "",
            blankKey6 : "",
            blankKey7 : "",
            blankKey8 : "",
            blankKey9 : ""
        }
      
        const file = await fsPROMISES.readFile(filename);
        JSONservers = JSON.parse(file);
        JSONservers.push(newSERVER);
      
        await fsPROMISES.writeFile(filename, JSON.stringify(JSONservers, null, 4));
    }
    
    NewServer()

    message.channel.send("le serveur a été ajouté à nos données, vous pouvez rééfectuer la commande !")
    
}