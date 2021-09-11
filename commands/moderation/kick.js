const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {

    if (message.member.hasPermission('ADMINISTRATOR')) {
      if (message.guild.me.hasPermission('MANAGE_CHANNELS')) {
        const user = message.mentions.users.first();
        if (user) {
          const member = message.guild.member(user);
          if (member) {
            member
              .kick({
                reason: `${message.author.tag} a exclu ${user.tag}`,
              })
              .then(() => {
                message.reply(`merci d'avoir kick ${user.tag} !`)
              })
              .catch(err => {
                message.reply("impossible de kick cet utilisateur.")
                console.error(err);
              });
          } else {
            message.reply("je ne connais pas cet individu.")
 
          }
        } else {
          message.reply("Merci de spécifier la personne à kick avec un @user.")
 
        }
      } else return message.channel.send(`Shimi n'a pas les permissions nécéssaires pour kick ${user.name}`)
      } else return message.channel.send('cette commande requiert les permissions Administrateur du serveur.')

}

module.exports.config = {
    name: "kick",
    category: "moderation",
    usage: "@user",
    stable: "✅ stable",
    description: "exclut l'utilisateur mentionné",
} 