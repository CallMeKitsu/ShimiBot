const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    let RepList = [
        "oui, sans aucun doute.",
        "non, impossible.",
        "peut etre.. tente ta chance !",
        "non, mais te suicide pas non plus 🥺",
        "jamais.",
        "bah ouii !",
        "oui, bah écoute, peut etre.",
        "MAIS C'ÉTAIT SÛR EN FAIT ! C'ÉTAIT SÛR !",
        "ah... bah ... comment te dire...",
        "ah ouais mais nan.",
        "PTDR, T KI ?" ]

    let question = args.slice(1).join(" ")
    if(!question) return message.channel.send("posez moi une question et j'y.. j'essaierai de vous répondre en tout cas !")
    let reponse = RepList[Math.floor(Math.random() * RepList.length)]

    message.reply(reponse)



}

module.exports.config = {
    name: "8ball",
    category: "jeux",
    usage: "{question existentielle}",
    stable: "✅ stable",
    description: "il répondra à toutes vos questions..",
} 