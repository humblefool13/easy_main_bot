const Fetch = require('node-fetch');
const Discord = require('discord.js');
const { color, botpfp } = require("../../config.json");

module.exports = {
  name: 'puppy',
  aliases: ['smold', 'pup', 'bork', 'bone'],
  guildOnly: true,
  description: 'Gets you a random puppy image .',
  cooldown: 15,
  permissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS"],
  usage: '`e;puppy`',
  data: {
    name: "puppy",
    description: "Maybe you need some puppy pics!?"
  },
  run: async (client, message) => {

    const { createClient } = require('pexels');

    const clientpk = createClient(process.env['pexels_key']);
    const query = 'puppy';
    const pageno = Math.ceil(Math.random() * 3);
    clientpk.photos.search({ query, per_page: 80, page: pageno, orientation: 'landscape' }).then(photos => {
      const tr = photos.total_results;
      const index = Math.floor(Math.random() * 80);
      const picurl = photos.photos[index].src.large2x;
      const picphotographer = photos.photos[index].photographer;
      const picphotographerurl = photos.photos[index].photographer_url;

      const pupembed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle('Photos provided by PEXELS!')
        .setURL('https://www.pexels.com')
        .addFields(
          { name: `Picture by : ${picphotographer}`, value: picphotographerurl }
        )
        .setImage(picurl)
        .setTimestamp()
        .setFooter('Adorable Pups for you');

      message.reply({
        embeds: [pupembed],
        reply: { messageReference: message.Id }
      });
    });



  }//run
}//module.exports