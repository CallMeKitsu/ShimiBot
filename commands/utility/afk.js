const Discord = require('discord.js')
const fetch = require('node-fetch')
const fs = require('fs')
const fsPROMISES = require('fs').promises
module.exports.run = async (client, message, args) => {

    let JSONafk = JSON.parse(fs.readFileSync('./database/json/afkLIST.json'))

    if(args[1] === "set") {

        let VAR_EXIST = JSONafk.find(x => x.ID === message.author.id)

        if(VAR_EXIST !== undefined) return message.channel.send(`vous avez déjà un AFK défini, utilisez \`${client.prefix}afk remove\``)

        let VAR_CONTENT = args.slice(2).join(' ')
        if(!VAR_CONTENT) VAR_CONTENT = `${message.author.username} n'est pas disponible, veuillez rééssayer plus tard.`
    
        async function SetAFK() {
            const filename = './database/json/afkLIST.json';
        
            await fsPROMISES.writeFile(filename, JSON.stringify(JSONafk));
          
            const newBlackList = {
                ID: message.author.id ,
                AFK: "on",
                message: VAR_CONTENT
            }
          
            const file = await fsPROMISES.readFile(filename);
            JSONafk = JSON.parse(file);
            JSONafk.push(newBlackList);
          
            await fsPROMISES.writeFile(filename, JSON.stringify(JSONafk, null, 4));
        }
        
        SetAFK()

        message.channel.send('merci, vous avez bien ajouté votre AFK !')
    }
    if(args[1] === "remove") {

        let VAR_EXIST = JSONafk.find(x => x.ID === message.author.id)

        if(VAR_EXIST === undefined) return message.channel.send(`vous n' avez pas d'AFK défini, utilisez \`${client.prefix}afk set\``)

        const fileName = './database/json/afkLIST.json'

        for(var i = 0; i < JSONafk.length; i++) {
            if(JSONafk[i]['ID'] === message.author.id) {
                JSONafk.splice(i, 1)
                break
            }
        }
            
        fs.writeFile(fileName, JSON.stringify(JSONafk, null, 4), function writeJSON(err) {
          if (err) return console.log(err);
        });

        message.channel.send('merci, vous avez bien supprimé votre AFK !')

    }
    if(args[1] !== "remove" && args[1] !== "set") return client.emit('invalidArg', message)


}

module.exports.config = {
    name: "afk",
    category: "utility",
    usage: "[ set <message> / remove ]",
    stable: "✅ stable",
    description: "active / désactive votre AFK\nrenverra un message d'AFK lorsque quelqu'un vous mentionnera",
}