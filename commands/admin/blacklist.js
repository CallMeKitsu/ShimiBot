const Discord = require('discord.js')
const fsPROMISES = require('fs').promises
const fs = require('fs')
module.exports.run = async (client, message, args) => {

    let JSONblack = JSON.parse(fs.readFileSync('./database/json/blackLIST.json'));

    if(!args[1]) return message.channel.send(`mauvaise utilisation de la commande`)

    let user =  message.mentions.users.first() || client.users.cache.get(args[1])

    if(!user) return message.channel.send('vous devez mentionner un utilisateur')

    async function BlackListThatGuy() {
        const filename = './database/json/blackLIST.json';
    
        await fsPROMISES.writeFile(filename, JSON.stringify(JSONblack));
      
        const newBlackList = user.id
      
        const file = await fsPROMISES.readFile(filename);
        JSONblack = JSON.parse(file);
        JSONblack.push(newBlackList);
      
        await fsPROMISES.writeFile(filename, JSON.stringify(JSONblack, null, 4));
    }
    
    BlackListThatGuy()

    message.channel.send(`merci, vous avez BlackList ${user.username}.`)

}

module.exports.config = {
    name: "blacklist",
    category: "admin",
    usage: "@user",
    stable: "✅ stable",
    description: "ajoute l'utilisateur aux BlackListés",
}