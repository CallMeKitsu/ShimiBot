class CMDhandler {
    constructor(run, CMDstructure) {
        this.run = (interaction, config, client) => run(interaction, config, client)
        this.structure = CMDstructure
    }

    compute(interaction, config, client) {
        
        if(interaction.options._hoistedOptions.length != this.structure.args.length) {
            return interaction.reply('Mauvaise utilisation de la commande.')
        } else this.run(interaction, config, client)

    }
}

module.exports.CMDhandler = CMDhandler