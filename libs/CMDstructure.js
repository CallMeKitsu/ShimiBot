const { SlashCommandBuilder } = require('@discordjs/builders')

class CMDstructure extends SlashCommandBuilder {
    constructor(name, desc) {
      super()
      this.setName(name).setDescription(desc)
      this.args = []
      return this
    }
  
    int(name, desc, isRequired=false) {
      this.addIntegerOption(o =>
        o.setName(name).setRequired(isRequired).setDescription(desc))
        this.args.push(name)
      return this
    }
  
    str(name, desc, isRequired=false) {
      this.addStringOption(o =>
        o.setName(name).setRequired(isRequired).setDescription(desc))
        this.args.push(name)
      return this
    }
  
    bool(name, desc, isRequired=false) {
      this.addBooleanOption(o =>
        o.setName(name).setRequired(isRequired).setDescription(desc))
        this.args.push(name)
      return this
    }
  
    user(name, desc, isRequired=false) {
      this.addUserOption(o =>
        o.setName(name).setRequired(isRequired).setDescription(desc))
        this.args.push(name)
      return this
    }
}

module.exports.CMDstructure = CMDstructure