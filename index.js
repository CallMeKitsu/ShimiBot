const Discord = require("discord.js")
const fs = require("fs")
const chalk = require('chalk')
const client = new Discord.Client()
client.tsu = require('./functions.js')
client.config = require("./config.json")
client.renawLIST = require("./database/json/renawLIST.json")
client.tokenLIST = require("./database/json/tokenLIST.json")
client.gameLIST = require("./database/json/gameLIST.json")
client.underLIST = require('./database/json/underLIST.json')
client.categoryDisplay = require('./database/json/categoryDisplay.json')
client.suggestLIST = require('./database/json/suggestLIST.json')
client.apiKEYS = require('./database/json/apiKEYS.json')

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
