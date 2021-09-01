const { exception } = require('console')
const Discord = require('discord.js')
const fetch = require('node-fetch')
module.exports.run = async (client, message, args) => {

    let SEARCH_REQUEST = args.slice(1).join(" ")
    let API_KEY = client.apiLIST.keys.dicolink

    let RequestURL = `https://api.dicolink.com/v1/mot/${SEARCH_REQUEST}/definitions?limite=200&api_key=${API_KEY}`

    const def = await fetch(RequestURL)

        .then(res => res.json())
        .then(json => {
            if(json[0] === undefined) return
            else return json[0]['definition']
        })

    const title = await fetch(RequestURL)

        .then(res => res.json())
        .then(json => json[0]['mot'])

    const source = await fetch(RequestURL)

    .then(res => res.json())
    .then(json => json[0]['source'])
    
    if(extract === undefined) return message.channel.send(`Shimi n'a rien trouvé pour "${SEARCH_REQUEST}"`)

    let embed = new Discord.MessageEmbed()

    .setColor(client.config.EmColor)
    .setThumbnail(client.user.avatarURL())
    .addField(`${title} :`, def)
    .setFooter(`source : ${source}`)

    message.channel.send(embed)

}

module.exports.config = {
    name: "def",
    category: "utility",
    usage: "{recherche}",
    stable: "❌ instable",
    description: "renvoie la définition du mot recherché\n!! ne peut contenir de caractères spéciaux",
} 