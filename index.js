const Discord = require("discord.js")
const fs = require("fs")
const chalk = require('chalk')
const client = new Discord.Client()
client.config = JSON.parse(fs.readFileSync("./config.json"))
client.renawLIST = JSON.parse(fs.readFileSync("./database/json/renawLIST.json"))
client.tokenLIST = JSON.parse(fs.readFileSync("./database/json/tokenLIST.json"))
client.gameLIST = JSON.parse(fs.readFileSync("./database/json/gameLIST.json"))
client.underLIST = JSON.parse(fs.readFileSync('./database/json/underLIST.json'))
client.categoryDisplay = JSON.parse(fs.readFileSync('./database/json/categoryDisplay.json'))
client.suggestLIST = JSON.parse(fs.readFileSync('./database/json/suggestLIST.json'))
client.apiLIST = JSON.parse(fs.readFileSync('./database/json/apiLIST.json'))
client.meteoLIST = JSON.parse(fs.readFileSync('./database/json/meteoLIST.json'))

function GetPrefixById(GuildID) { 

    let JSONservers = JSON.parse(fs.readFileSync('./database/json/serverLIST.json'))

    let ThePrefix = client.config.prefix

    let found = JSONservers.find(x => x.ID === GuildID)

    if(found && found.prefix !== "") {
        ThePrefix = found.CustomPrefix
    }

    return ThePrefix

}

client.on('message', message => {
    if (message.channel.type === "dm") return client.prefix = ">"
    client.prefix = GetPrefixById(message.guild.id) || ">"
})

client.login(client.tokenLIST.default)

const loadEvents = (dir = './events/') => {
    const fs = require("fs")
    fs.readdirSync(dir).forEach(dirx => {
        const events = fs.readdirSync(`${dir}/${dirx}/`).filter(files => files.endsWith(".js"));
      
        for (const event of events) {

            const evt = require(`${dir}/${dirx}/${event}`)
            const evtName = event.split(".")[0]
            client.on(evtName, evt.bind(null, client))
            console.log(chalk.blueBright(`Evenement chargé : ${evtName}`))

        }
    })
}

const collections = ["commands", "cooldowns"].forEach(x => client[x] = new Discord.Collection() )

const loadCommands = (dir = './commands/') => {

    const fs = require("fs")
    fs.readdirSync(dir).forEach(dirx => {
        const commands = fs.readdirSync(`${dir}/${dirx}/`).filter(files => files.endsWith(".js"));
      
        for (const file of commands) {

            const getFileName = require(`${dir}/${dirx}/${file}`)
            client.commands.set(getFileName.config.name, getFileName)
            console.log(chalk.redBright(`commande chargée : ${getFileName.config.name}`))

        }
    })
}

loadEvents()
loadCommands()
