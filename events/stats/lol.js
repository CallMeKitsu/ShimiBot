const Discord = require("discord.js")
const fetch = require('node-fetch');
module.exports = async (client, message) => {

let args = message.content.trim().split(/ +/g);

const API_KEY = "RGAPI-d2612b45-2f63-4e5f-bbd1-b21ea9945e51"
    
let NAME_REQUEST = args.slice(2).join(" ")
if(!NAME_REQUEST) return message.channel.send('merci de saisir en argument un nom de joueur')

let RequestURL = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${NAME_REQUEST}?api_key=${API_KEY}`

const lvl = await fetch(RequestURL)

    .then(res => res.json())
    .then(json => json.summonerLevel)

const pseudo =await fetch(RequestURL)

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
    .then(json => json[0]['rank'])

let tier = await fetch(SecondRequestURL)

    .then(res => res.json())
    .then(json => json[0]['tier'])

if(rank === undefined) rank = "classé"
if(tier === undefined) tier = "non"

let ThirdRequestURL = `https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account/${EncryptedAccountID}?api_key=${API_KEY}`

message.channel.send(ThirdRequestURL)

let rankedGames = await fetch(ThirdRequestURL)

.then(res => res.json())
.then(json => json.totalGames)


let ImageURL = `https://ddragon.leagueoflegends.com/cdn/11.10.1/img/profileicon/${IconID}.png`

let embed = new Discord.MessageEmbed()

    .setTitle("STATS LOL :")
    .setURL('https://developer.riotgames.com/apis')
    .setColor(client.config.EmColor)
    .addField('Pseudo :', pseudo, true)
    .addField('Niveau :', lvl, true)
    .addField('Rank :', `${tier} ${rank}`)
    .addField('Games en Ranked :', `${rankedGames}`)
    .setThumbnail(ImageURL)

message.channel.send(embed)

}