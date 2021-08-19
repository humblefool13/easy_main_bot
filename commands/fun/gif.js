const Fetch = require('node-fetch');
const Discord = require('discord.js');
const Path = require('path');
const giffildb = require('../../models/giffilmodel');
require("mongoose");
const { color } = require("../../config.json");
const embed = new Discord.MessageEmbed().setColor(color).setTimestamp()
const notfound = embed.setDescription("No results for this search , try searching something different .")

module.exports = {
  name: 'gif',
  aliases: ['g'],
  description: 'Provide any GIFs you want , though filtered by setting saved by server administrator using `e;giffil` .',
  cooldown: 10,
  permissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS"],
  usage: '`e;gif <gif you want>`',
  args: true,
  guildOnly: true,
  run: async (client, message, args) => {
    keyword = args.join(' ').toLowerCase();
    const guildid = message.guild.id;
    const filt = await giffildb.findOne({
      guildid: guildid,
    });

    try {

      if (filt) {
        let url = `https://api.tenor.com/v1/search?q=${keyword}&key=${process.env['tenor_key']}&contentfilter=${filt.filter}&limit=10`;
        const response = await Fetch(url);
        const result = await response.json();
        const index = Math.floor(Math.random() * result.results.length);
        message.reply({
          content: result.results[index].url
        });
      } else {
        let url = `https://api.tenor.com/v1/search?q=${keyword}&key=${process.env['tenor_key']}&limit=10&contentfilter=medium`;
        const response = await Fetch(url);
        const result = await response.json();
        const index = Math.floor(Math.random() * result.results.length);
        message.reply({
          content: result.results[index].url
        });
      }

    } catch (e) {
      return message.reply({
        embeds: [new Discord.MessageEmbed().setColor(color).setTimestamp().setDescription("<@" + message.author.id + "> , No results found for the search : " + keyword)]
      })
    }

  }//end of execute
}
