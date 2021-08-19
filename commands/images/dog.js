const Fetch = require('node-fetch');
const Discord = require('discord.js');
const { color, botpfp } = require("../../config.json");

module.exports = {
  name: 'dog',
  aliases: ['dogs', 'd', 'pawsd', 'dogo'],
  guildOnly: true,
  description: 'Gets you a random dog image .',
  cooldown: 15,
  data: {
    name: "dogs",
    description: "Get a random dog image"
  },
  usage: '`e;dog`',
  permissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS"],
  run: async (client, message) => {

    const { createClient } = require('pexels');

    const clientp = createClient(process.env['pexels_key']);
    const query = 'dog';
    const pageno = Math.ceil(Math.random() * 10);
    clientp.photos.search({ query, per_page: 80, page: pageno, orientation: 'landscape' }).then(photos => {
      const tr = photos.total_results;
      const index = Math.floor(Math.random() * 80);
      const picurl = photos.photos[index].src.large2x;
      const picphotographer = photos.photos[index].photographer;
      const picphotographerurl = photos.photos[index].photographer_url;

      const dogembed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle('Photos provided by PEXELS!')
        .setURL('https://www.pexels.com')
        .addFields(
          { name: `Picture by : ${picphotographer}`, value: picphotographerurl }
        )
        .setImage(picurl)
        .setTimestamp()
        .setFooter('Dogs for you');

      message.reply({
        embeds: [dogembed],
        reply: { messageReference: message.Id }
      });
    });



  }//run
}//module.exports