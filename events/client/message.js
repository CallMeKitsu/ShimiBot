const Discord = require("discord.js")
const chalk = require("chalk")
const fs = require("fs")
module.exports = (client, message) => {

    let blackLIST = JSON.parse(fs.readFileSync('./database/json/blackLIST.json'))
    let afkLIST = JSON.parse(fs.readFileSync('./database/json/afkLIST.json'))

    if(message.mentions.users.first()) {

        console.log("ping")

        let user = message.mentions.users.first()

        function IsUserAfk(ThisUserId) {
            for(var i = 0; i < afkLIST.length; i++) {
                if(afkLIST[i]['ID'] === ThisUserId) {
                    return true
                    break
                }
            }
        }

        if(IsUserAfk(user.id) === true) {

            console.log("pong")

            let found = afkLIST.find(x => x.ID === user.id)
      
            if(!found) message.channel.send(`AFK erreur : merci de \`${client.config.prefix}report\``)
    
            message.channel.send(`AFK : ${found.message}`)
        }

    }

    if (message.author.bot) return;
    if (message.channel.type === "dm") return client.emit("directMessage", message)
    
    if(message.content.startsWith(client.config.prefix)) {
    let args = message.content.trim().split(/ +/g);
    let CommandArgs = message.content.slice(client.config.prefix.length).split(/ +/);
    let commandName = CommandArgs.shift().toLowerCase()

    if(!client.commands.has(commandName)) return
    const command = client.commands.get(commandName)

    if(command.config.category === "admin") {
        if(message.author.id !== client.config.admin) return message.channel.send("commande créateur. nécéssite une permission admin de Shimi.")
    }
    if(command.config.stable === "❌ instable") {
        console.log(chalk.red("COMMANDE INSTABLE APPELLÉE"))
        if(message.author.id !== client.config.admin) return message.channel.send("la commande est instable, seul l'admin peut la tester.")
    }
    if(blackLIST.includes(message.author.id)) return message.channel.send("Vous avez été BlackListé, vous n'avez plus accès aux commandes.")
    

        if(!client.cooldowns.has(command.config.name)) {
            client.cooldowns.set(command.config.name, new Discord.Collection())
        }

        const NowTime = Date.now()
        const tStamps = client.cooldowns.get(command.config.name)
        const cdAmount = (command.config.cooldown || 3) * 1000

        

        if(tStamps.has(message.author.id)) {
            const cdExpirationTime = tStamps.get(message.author.id) + cdAmount

            if(NowTime < cdExpirationTime) {
                timeLeft = (cdExpirationTime - NowTime) / 1000
                return message.channel.send(`merci d'attendre ${timeLeft.toFixed(0)} seconde(s) avant d'utiliser cette commande`)
            }
        }

        tStamps.set(message.author.id, NowTime)
        setTimeout(() => tStamps.delete(message.author.id), cdAmount)

        command.run(client, message, args)

    } // prefix okei

    if(client.config.stalkVar === "on") { // si StalkVar = on

        let embed = new Discord.MessageEmbed() // embed de Stalk
        .setColor(client.config.EmColor)
        .addField(message.author.tag, message.content)
        .addField(`informations :`, `channel : ${message.channel.id} \nserver : ${message.guild.id}`)
     
        client.channels.fetch(client.config.stalkChan) // trouver StalkChan
        .then(channel => channel.send(embed) ) // envoyer l'embed

    } 
    
    if(client.config.stalkVar === "off") { // si StalkVar = off
    return // ne rien faire
    } 
}