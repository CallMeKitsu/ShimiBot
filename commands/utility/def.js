const { exception } = require('console')
const Discord = require('discord.js')
const fetch = require('node-fetch')
module.exports.run = async (client, message, args) => {

    const regex = /^[A-Za-z]+$/

    if(args[1].match(regex) < args[1].length) return client.emit('alphaCharsNeeded', message)

    let SEARCH_REQUEST = args[1].toLowerCase().toString()
    let API_KEY = client.apiLIST.keys.dicolink

    let RequestURL = `https://api.dicolink.com/v1/mot/${SEARCH_REQUEST}/definitions?limite=200&api_key=${API_KEY}`

    const def = await fetch(RequestURL)

        .then(res => res.json())
        .then(json => {
            if(json[0] === undefined) return
            else return json[0]['definition']
        })

    if (def === undefined) return message.channel.send(`Shimi n'a rien trouvé pour "${SEARCH_REQUEST}"`)

    const title = await fetch(RequestURL)

        .then(res => res.json())
        .then(json => json[0]['mot'])

    const source = await fetch(RequestURL)

    .then(res => res.json())
    .then(json => json[0]['source'])
    

    let embed = new Discord.MessageEmbed()

    .setColor(client.config.EmColor)
    .setThumbnail(client.user.avatarURL())
    .addField(`Définition : ${title}`, def)
    .setFooter(`Résultats provenant de : ${source}`)

    message.channel.send(embed)

}

module.exports.config = {
    name: "def",
    category: "utility",
    usage: "{recherche}",
    stable: "✅ stable",
    description: "renvoie la définition du mot recherché\n!! ne peut contenir de caractères spéciaux",
} 