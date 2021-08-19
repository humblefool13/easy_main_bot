const Fetch = require('node-fetch');
const Discord = require('discord.js');
const { color, botpfp } = require("../../config.json");

module.exports = {
  name: 'kitten',
  aliases: ['smolc', 'kitty', 'meow', 'cute-en'],
  guildOnly: true,
  description: 'Gets you a random kitten image .',
  cooldown: 15,
  usage: '`e;kitten`',
  data: {
    name: "kitten",
    description: "Get a random kitten image"
  },
  permissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS"],
  run: async (client, message) => {

    const { createClient } = require('pexels');

    const clientpk = createClient(process.env['pexels_key']);
    const query = 'kitten';
    const pageno = Math.ceil(Math.random() * 3);
    clientpk.photos.search({ query, per_page: 80, page: pageno, orientation: 'landscape' }).then(photos => {
      const tr = photos.total_results;
      const index = Math.floor(Math.random() * 80);
      const picurl = photos.photos[index].src.large2x;
      const picphotographer = photos.photos[index].photographer;
      const picphotographerurl = photos.photos[index].photographer_url;

      const kitembed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle('Photos provided by PEXELS!')
        .setURL('https://www.pexels.com')
        .addFields(
          { name: `Picture by : ${picphotographer}`, value: picphotographerurl }
        )
        .setImage(picurl)
        .setTimestamp()
        .setFooter('Cute-ens for you');

      message.reply({
        embeds: [kitembed],
        reply: { messageReference: message.Id }
      });
    });



  }//run
}//module.exports