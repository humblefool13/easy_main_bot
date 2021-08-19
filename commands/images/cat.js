const Fetch = require('node-fetch');
const Discord = require('discord.js');
const { color, botpfp } = require("../../config.json");

module.exports = {
  name: 'cat',
  aliases: ['cats', 'c', 'pawsc'],
  guildOnly: true,
  description: 'Gets you a random cat image .',
  cooldown: 15,
  usage: '`e;cat`',
  permissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS"],
  run: async (client, message) => {

    const { createClient } = require('pexels');

    const clientp = createClient(process.env['pexels_key']);
    const query = 'cat';
    const pageno = Math.ceil(Math.random() * 10);
    clientp.photos.search({ query, per_page: 80, page: pageno, orientation: 'landscape' }).then((photos) => {
      const tr = photos.total_results;
      const index = Math.floor(Math.random() * 80);
      const picurl = photos.photos[index].src.large2x;
      const picphotographer = photos.photos[index].photographer;
      const picphotographerurl = photos.photos[index].photographer_url;

      const catembed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle('Photos provided by PEXELS!')
        .setURL('https://www.pexels.com')
        .addFields(
          { name: `Picture by : ${picphotographer}`, value: picphotographerurl }
        )
        .setImage(picurl)
        .setTimestamp()
        .setFooter('Cats for you');

      message.reply({
        embeds: [catembed],
      });
    });



  }//run

}//module.exports