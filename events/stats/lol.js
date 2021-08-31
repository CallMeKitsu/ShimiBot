const Discord = require("discord.js")
const fetch = require('node-fetch');
module.exports = async (client, message) => {

let args = message.content.trim().split(/ +/g);

let limited = client.apiLIST.limits.riot

const API_KEY = client.apiLIST.keys.riot
    
let NAME_REQUEST = args.slice(2).join(" ")
if(!NAME_REQUEST) return message.channel.send('merci de saisir en argument un nom de joueur')
if(limited === "true") return message.channel.send("la clé d'API riot de Shimi a expiré, désolé !")

let RequestURL = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${NAME_REQUEST}?api_key=${API_KEY}`

const lvl = await fetch(RequestURL)

    .then(res => res.json())
    .then(json => json.summonerLevel)

const pseudo = await fetch(RequestURL)

    .then(res => res.json())
    .then(json => json.name)

const IconID = await fetch(RequestURL)

    .then(res => res.json())
    .then(json => json.profileIconId)

const EncryptedSummonerID = await fetch(RequestURL)

    .then(res => res.json())
    .then(json => json.id)

const EncryptedAccountID = await fetch(RequestURL)

    .then(res => res.json())
    .then(json => json.accountId)

if(pseudo === undefined) return message.channel.send(`le joueur ${args.slice(1).join(" ")} n'existe pas`)

let SecondRequestURL = `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${EncryptedSummonerID}?api_key=${API_KEY}`

let rank = await fetch(SecondRequestURL)

    .then(res => res.json())
    .then(json => {
        if(json[0] === undefined) return
        else return json[0]['rank']
    })

let tier = await fetch(SecondRequestURL)

    .then(res => res.json())
    .then(json => {
        if(json[0] === undefined) return
        else return json[0]['tier']
    })


let ThirdRequestURL = `https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account/${EncryptedAccountID}?api_key=${API_KEY}`

let rankedGames = await fetch(ThirdRequestURL)

.then(res => res.json())
.then(json => json.totalGames)


let ImageURL = `https://ddragon.leagueoflegends.com/cdn/11.16.1/img/profileicon/${IconID}.png` || "https://www.dexerto.fr/wp-content/uploads/sites/2/2020/10/league-client-update-header.jpg"

let embed = new Discord.MessageEmbed()

    .setColor(client.config.EmColor)
    .addField('Pseudo :', pseudo, true)
    .addField('Niveau :', lvl, true)
    if(tier === undefined) tier = "non"
    if(rank === undefined) rank = "classé"
    embed.addField('Rank :', `${tier} ${rank}`)
    if(rankedGames === undefined) rankedDESC = "aucune partie en ranked"
    else(rankedDESC = `${rankedGames} parties en ranked`)
    embed.addField('Games en Ranked :', rankedDESC)
    embed.setThumbnail(ImageURL)

message.channel.send(embed)

}