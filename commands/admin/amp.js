const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    if (message.member.hasPermission('ADMINISTRATOR')) {
    let destinataire = message.guild.member(message.mentions.users.first());
    if (!destinataire){
        return message.channel.send("L'utilisateur n'existe pas");
    }
    let ContentMp = args.slice(2).join(" ")
    if(!ContentMp) return message.channel.send("veuillez saisir un message à envoyer.")
    destinataire.send(ContentMp);

} else return message.channel.send('cette commande requiert les permissions Administrateur du serveur.')

}

module.exports.config = {
    name: "amp",
    category: "admin",
    usage: "@user {message}",
    stable: "🟩 unhandled",
    description: "envoie un mp anonymement à l'utilisateur mentionné",
}