const Discord = require('discord.js')
const fetch = require('node-fetch')
module.exports.run = async (client, message, args) => {

    const API_KEY = client.apiLIST.keys.meteo

    let limited = client.apiLIST.limits.meteo

    let VILLE_REQUEST = args.slice(1).join(' ')
    if(!VILLE_REQUEST) return message.channel.send('merci de saisir un nom de ville')

    let RequestURL = `https://api.meteo-concept.com/api/location/cities?token=${API_KEY}&search=${VILLE_REQUEST}`

    const insee = await fetch(RequestURL)

        .then(res => res.json())
        .then(json => {
            if(json.cities[0] === undefined) return
            else return json.cities[0]['insee']
        })

    if(limited === "true") return message.channel.send("la clé d'API météo de Shimi ne lui permet que 500 requêtes par jour, désolé !")
    if(insee === undefined) return message.channel.send(`la ville "${VILLE_REQUEST}" n'existe pas ou n'a pas été trouvée`)

    let SecondRequestURL = `https://api.meteo-concept.com/api/forecast/daily?token=${API_KEY}&insee=${insee}`

    const name = await fetch(SecondRequestURL)

        .then(res => res.json())
        .then(json => json.city.name)
    
    const cp = await fetch(SecondRequestURL)

        .then(res => res.json())
        .then(json => json.city.cp)

    const probarain	 = await fetch(SecondRequestURL)

        .then(res => res.json())
        .then(json => json.forecast[0]['probarain'])


    const tempMAX = await fetch(SecondRequestURL)

        .then(res => res.json())
        .then(json => json.forecast[0]['tmax'])


    const tempMIN = await fetch(SecondRequestURL)

        .then(res => res.json())
        .then(json => json.forecast[0]['tmin'])

    const vent = await fetch(SecondRequestURL)

        .then(res => res.json())
        .then(json => json.forecast[0]['wind10m'])


    const gust = await fetch(SecondRequestURL)

        .then(res => res.json())
        .then(json => json.forecast[0]['gust10m'])

    const date = await fetch(SecondRequestURL)

    .then(res => res.json())
    .then(json => json.forecast[0]['datetime'])
    
    let INTEGER_TEMPS = await fetch(SecondRequestURL)

        .then(res => res.json())
        .then(json => json.forecast[0]['weather'])

    let tempsVar = client.meteoLIST.temps[INTEGER_TEMPS].name

    if(!tempsVar) tempsVar = 'météo introuvable'

    let ThirdRequestURL = `https://api.meteo-concept.com/api/ephemeride/0?token=${API_KEY}&insee=${insee}`

    const durationDay = await fetch(ThirdRequestURL)

    .then(res => res.json())
    .then(json => json.ephemeride.duration_day)

    const durationDiff = await fetch(ThirdRequestURL)

    .then(res => res.json())
    .then(json => json.ephemeride.diff_duration_day)

    const sunrise = await fetch(ThirdRequestURL)

    .then(res => res.json())
    .then(json => json.ephemeride.sunrise)

    const sunset = await fetch(ThirdRequestURL)

    .then(res => res.json())
    .then(json => json.ephemeride.sunset)

    let embed = new Discord.MessageEmbed()

    .setColor(client.config.EmColor)
    .setThumbnail(client.user.avatarURL())
    .addField('Nom de la Ville :', name, true)
    .addField('Code Postal :', cp, true)
    .addField('Météo :', "\\" + tempsVar)
    .addField('Probabilité de pluie :', `${probarain}% de chances`, true)
    .addField('Température :', `entre ${tempMIN} et ${tempMAX}°C`, true)
    .addField('Heures de lever / coucher du soleil :', `le soleil se lève à ${sunrise} et se couche à ${sunset}`)
    .addField('Durée de la journée :', `la journée dure ${durationDay} (${durationDiff}min par rapport à hier)`)
    .addField('Vitesse du vent :', `${vent} km/h à 10m`, true)
    .addField('Rafales de vent :', `${gust} km/h à 10m`, true)


    message.channel.send(embed)

}

module.exports.config = {
    name: "meteo",
    category: "utility",
    usage: "{ville}",
    stable: "✅ stable",
    description: "renvoie la météo d'une ville\n!! ne peut contenir de caractères spéciaux",
} 