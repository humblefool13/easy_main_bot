const Discord = require('discord.js');
const { color } = require("../../config.json")

module.exports = {
  name: 'invite',
  cooldown: 20,
  description: 'Invite bot to your server !!!',
  guildOnly: false,
  usage: '`e;invite`',
  permissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS"],
  run: (client, message) => {
    const embed = new Discord.MessageEmbed()
      .setColor(color)
      .setDescription(`To invite the bot to your server , [click here](https://discord.com/oauth2/authorize?client_id=844656815627436112&scope=bot+applications.commands&permissions=388160) !!!`)
      .setTimestamp();
    message.channel.send({
      embeds: [embed]
    });
  }//run
};//module