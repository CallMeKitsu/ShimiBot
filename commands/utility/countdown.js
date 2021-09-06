const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    const maintenant = new Date(Date.now())

    if(!args[1]) return message.channel.send('mauvaise utilisation de la commande')    

    let ArgumentSlash = args[1].trim().split('/')

    let day = ArgumentSlash[0]
    let month = ArgumentSlash[1]
    let year = ArgumentSlash[2]

    if(!day) return message.channel.send('mauvaise utilisation de la commande')
    if(!month) return message.channel.send('mauvaise utilisation de la commande')

    if(!year) {
        if(maintenant.getMonth() > month -1) year = maintenant.getFullYear() + 1
        else year = maintenant.getFullYear()
    }

    const INPUT_DATE = new Date(year, month -1, day)

    function isValidDate() {
        if( ! isNaN ( INPUT_DATE.getDay() ) ) {
           return true;
        }
        return false;
    }

    if(isValidDate() === false) return message.channel.send('date ou format invalide ou non pris en charge')

    const distanceBase = INPUT_DATE - maintenant

    const CDdays = Math.floor(distanceBase / (3600000 * 24))
    const CDhours = Math.floor((distanceBase % (3600000 * 24)) / 3600000)
    const CDminutes = Math.floor((distanceBase % 3600000) / (1000 * 60)) 
    const CDseconds = Math.floor((distanceBase % (1000 * 60)) / 1000)

    let RenderCD = `**${CDdays}** jours, **${CDhours}** heures, **${CDminutes}** minutes et **${CDseconds}** secondes`

    let embed = new Discord.MessageEmbed()
    .setColor(client.config.EmColor)
    .setDescription(`il reste ${RenderCD} !`)
    message.channel.send(embed)

}

module.exports.config = {
    name: "countdown",
    category: "utility",
    usage: "{dd}/{mm}</yyyy>",
    stable: "✅ stable",
    description: "renvoie le temps qu'il reste avant un jour précis",
}