const Discord = require("discord.js");
const { prefix, color, botpfp } = require('../config.json');

const cooldowns = new Discord.Collection();
const roleperms = require('../models/rolepermsmodel');
const autoreact = require('../models/autoreactmodel');
require("mongoose");

const baseembed = new Discord.MessageEmbed().setColor(color).setTimestamp()

module.exports = {
  name: "interactionCreate",
  once: false,
  async execute(client, interaction) {
    if (!interaction.isCommand()) return;
    const cmd = interaction.commandName;
    const interact = client.interactions.get(cmd);
    try {
      interact.interact(client, interaction);
    } catch (e) {
      console.log(e);
    }
  }//execute
}//module.exports