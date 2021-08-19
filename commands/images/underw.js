const Fetch = require('node-fetch');
const Discord = require('discord.js');
const { color, botpfp } = require("../../config.json");

module.exports = {
  name: 'underw',
  aliases: ['uw', 'aqua', 'aquatic'],
  guildOnly: true,
  description: 'We all interested inside our oceans.',
  cooldown: 15,
  permissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS"],
  usage: '`e;underw`',
  run: async (client, message) => {

    const { createClient } = require('pexels');

    const clientp = createClient(process.env['pexels_key']);
    const query = 'coral';
    const pageno = Math.ceil(Math.random() * 3);
    clientp.photos.search({ query, per_page: 80, page: pageno, orientation: 'landscape' }).then(photos => {
      const tr = photos.total_results;
      const index = Math.floor(Math.random() * 80);
      const picurl = photos.photos[index].src.large2x;
      const picphotographer = photos.photos[index].photographer;
      const picphotographerurl = photos.photos[index].photographer_url;

      const uwembed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle('Photos provided by PEXELS!')
        .setURL('https://www.pexels.com')
        .addFields(
          { name: `Picture by : ${picphotographer}`, value: picphotographerurl }
        )
        .setImage(picurl)
        .setTimestamp()
        .setFooter('Who won\'t love it 💙💙💙');

      message.reply({
        embeds: [uwembed],
      });
    });



  }//run
}//module.exports