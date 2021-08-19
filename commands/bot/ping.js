const Discord = require("discord.js");
const { color } = require("../../config.json")

module.exports = {
  name: "ping",
  category: "Information",
  aliases: ["latency"],
  cooldown: 10, //in seconds
  usage: "`e;ping`",
  args: false,
  permissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS"],
  guildOnly: true,
  description: "Gives you information on how fast the Bot can respond to you",
  run: async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
      .setColor(color)
      .setDescription(`Pong :ping_pong: : ${client.ws.ping} ms`)
      .setTimestamp();

    message.channel.send({
      embeds: [embed]
    });

  }
};//run