const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    if (message.member.hasPermission('ADMINISTRATOR')) {
    let destinataire = message.guild.member(message.mentions.users.first());
    if (!destinataire){
        return message.channel.send("l'utilisateur n'existe pas ou n'est pas sur ce serveur");
    }
    let userTest = message.mentions.users.first()
    if(userTest.bot){
        return message.channel.send("impossible d'utiliser cette commande sur un bot");
    }
    let ContentMp = args.slice(2).join(" ")
    if(!ContentMp) return message.channel.send("veuillez saisir un message à envoyer.")
    destinataire.send(`${message.author.username} vous envoie un mp : ${ContentMp}`);

} else return message.channel.send('cette commande requiert les permissions Administrateur du serveur.')

}

module.exports.config = {
    name: "mp",
    category: "moderation",
    usage: "@user {message}",
    stable: "✅ stable",
    description: "envoie un mp à l'utilisateur mentionné",
}