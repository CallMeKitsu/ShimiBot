const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    if(!args[1]) return message.channel.send("merci de donner un nom de catégorie");
    if(!args[2]) return message.channel.send("merci de donner un nom de commande à reload.");
     const commandName = args[2];
     const category = args[1]
     const command = client.commands.get(commandName)


    if(!client.config.categoriesList.includes(category)) {
      return message.channel.send(`la catégorie "${category}" n'existe pas.`)
    } 
    if(command.config.category !== category) {
        return message.channel.send(`la commande "${commandName}" dans "${category}" n'existe pas.`);
      }
    delete require.cache[require.resolve(`./commands\\${category}\\${commandName}.js`)];
    client.commands.delete(commandName);
    const props = require(`./commands\\${category}\\${commandName}.js`);
    client.commands.set(commandName, props);
        message.channel.send(`La commande "${commandName}" a bien été reload.`);


}

module.exports.config = {
    name: "reload",
    category: "commands",
    usage: "{catégorie} {commande}",
    stable: "❌ instable",
    description: "reload la commande précisée",
} 