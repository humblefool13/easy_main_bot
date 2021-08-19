const Discord = require('discord.js');
const { color, botpfp } = require("../../config.json");


module.exports = {
  name: 'info',
  cooldown: 60,
  args: false,
  guildOnly: true,
  usage: '`e;info`',
  description: 'Info about the Bot.',
  permissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS"],
  run: (client, message) => {
    const { commands } = message.client;

    let users = 0;
    client.guilds.cache.each((g) => {
      users = users + g.memberCount;
    });

    const nguilds = client.guilds.cache.size;
    const nusers = users;
    const created = client.user.createdAt.toString().slice(0, 28);
    const uptime = client.uptime;
    const prefix = 'e;';
    const ping = client.ws.ping;
    const c = (commands.size - 1);
    const username = client.user.tag;


    var seconds = uptime / 1000;
    var hours = parseInt(seconds / 3600);
    seconds = seconds % 3600;
    var minutes = parseInt(seconds / 60);
    seconds = parseInt(seconds % 60);

    const uptimef = `${hours}h ${minutes}m ${seconds}s`;

    const infoembed = new Discord.MessageEmbed()
      .setColor(color)
      .setThumbnail(botpfp)
      .setTitle('Bot info-')
      .setTimestamp()
      .setDescription('A recreationary bot to have fun with.')
      .addFields(
        { name: 'Username :', value: username.toString(), inline: true },

        { name: 'Prefix :', value: prefix.toString(), inline: true },

        { name: 'Created at :', value: created.toString(), inline: true },

        { name: 'Number of Servers :', value: nguilds.toString(), inline: true },

        { name: 'Number of Users :', value: nusers.toString(), inline: true },

        { name: 'Number of Commands :', value: c.toString(), inline: true },

        { name: 'Bot Ping/Latency :', value: ping.toString(), inline: true },

        { name: 'Uptime :', value: uptimef.toString(), inline: true },

      );

    message.channel.send({
      embeds: [infoembed],
      allowedMentions: {
        "parse": []
      }
    });


  }

}//module.exports