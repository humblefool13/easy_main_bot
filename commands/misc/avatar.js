const Discord = require('discord.js');
const { color, botpfp } = require("../../config.json");

module.exports = {
  name: 'avatar',
  aliases: ['av', 'pfp', 'icon'],
  description: 'Get the avatar of mentioned user or yours in different formats.',
  cooldown: 15,
  usage: 'To get someones - `e;avatar <mention user>`\nTo get yours - `e;avatar`',
  permissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS"],
  args: true,
  data: {
    name: "avatar",
    description: "Get your avatar or any user you mention",
    options: [
      {
        name: "user",
        description: "Other user who's avatar you want",
        required: false,
        type: "USER",
      },
    ]
  },
  guildOnly: true,
  run: async (client, message, args) => {
    if (!message.mentions.users.size) {
      const urlpng = message.author.displayAvatarURL({ format: 'png', dynamic: true });
      const urljpg = message.author.displayAvatarURL({ format: 'jpg', dynamic: true });
      const urlwebp = message.author.displayAvatarURL({ format: 'webp', dynamic: true });
      const avembed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(`${message.author.tag}\'s avatar:`)
        .setDescription('Need link ?')
        .addFields(
          { name: 'PNG ⬇️', value: '[here](' + urlpng + ')', inline: true },

          { name: 'JPG ⬇️', value: '[here](' + urljpg + ')', inline: true },

          { name: 'WEBP ⬇️', value: '[here](' + urlwebp + ')', inline: true },
        )
        .setImage(message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 256 }))
        .setTimestamp();
      message.channel.send({ embeds: [avembed] });
    } else {
      const urlpng = message.mentions.users.first().displayAvatarURL({ format: 'png', dynamic: true });
      const urljpg = message.mentions.users.first().displayAvatarURL({ format: 'jpg', dynamic: true });
      const urlwebp = message.mentions.users.first().displayAvatarURL({ format: 'webp', dynamic: true });
      const avembed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(`${message.mentions.users.first().tag}\'s avatar:`)
        .setDescription('Need link ?')
        .addFields(
          { name: 'PNG ⬇️', value: '[here](' + urlpng + ')', inline: true },

          { name: 'JPG ⬇️', value: '[here](' + urljpg + ')', inline: true },

          { name: 'WEBP ⬇️', value: '[here](' + urlwebp + ')', inline: true },
        )
        .setImage(message.mentions.users.first().displayAvatarURL({ format: 'png', dynamic: true, size: 256 }))
        .setTimestamp();
      message.channel.send({ embeds: [avembed] });

    }
  }
}//module