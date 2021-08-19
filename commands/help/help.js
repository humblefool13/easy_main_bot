const { color, botpfp } = require('../../config.json');
const { readdirSync } = require("fs");
const Discord = require('discord.js');

module.exports = {
  name: 'help',
  description: 'List all of my commands or info about a specific command.',
  aliases: ['commands', 'h'],
  guildOnly: true,
  usage: '`e;help <command name>`',
  permissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS"],
  cooldown: 20,
  run: async (client, message, args) => {
    const data = [];
    const { commands } = message.client;
    if (!args.length) {
      const helpembed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle('EASY BOT commands -')
        .setThumbnail(botpfp)
        .addFields(
          { name: 'Fun commands :grin: : ', value: '`pun` , `gif` , `autoreact`' },

          { name: 'Image commands :film_frames: :', value: '`cat` , `kitten` , `dog` , `puppy` , `flower` ,`nature` , `sky` , `underw`' },

          { name: 'Utility commands :tools: : ', value: ' `calc` , `embed`' },

          { name: 'Minigames <:games:872888674835107920> : ', value: '`hangman`' },

          { name: 'Miscellaneous :woozy_face: :', value: '`argstest` , `avatar`' },

          { name: 'Settings :gear: :', value: '`giffil` , `addrole` , `delrole` , `showroles`' },

          { name: 'Bot specific :robot: :', value: '`invite` , `ping` , `info` , `vote`' },
        )
        .setTimestamp()
        .setFooter('For help in specific command try the help command with command name , like , `e;help <command name>`');
      message.reply({
        embeds: [helpembed],
        allowedMentions: {
          "parse": []
        }
      });
    } else {
      const name = args[0].toLowerCase();
      const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

      if (!command) {
        const invaled = new Discord.MessageEmbed()
          .setColor(color)
          .setTimestamp()
          .setDescription("That command does not exist .\nCheck `e;help` to see a full list of commands.");
        return message.reply({
          embeds: [invaled],
          allowedMentions: {
            "parse": []
          }
        });
      }

      data.push(`${command.name}`);

      if (command.aliases) {
        data.push(`${command.aliases.join(', ')}`);
      } else data.push(' - ');
      if (command.description) {
        data.push(`${command.description}`);
      } else data.push(' - ');
      if (command.usage) {
        data.push(`${command.usage}`);
      } else data.push(' - ');
      if (command.permissions) {
        data.push(`${command.permissions.join(`, `)}`);
      } else data.push(" - ");

      data.push(`${command.cooldown} second(s)`);

      const spechelpembed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle('EASY BOT HELP -')
        .setDescription(`${command.name.toUpperCase()} help -`)
        .addFields(
          { name: 'Command Name -', value: data[0] },

          { name: 'Description -', value: data[2] },

          { name: 'Aliases -', value: data[1] },

          { name: 'Cooldown -', value: data[5] },

          { name: 'Usage', value: data[3] },

          { name: 'Permissions Required', value: data[4] },
        )
        .setThumbnail(botpfp)
        .setFooter('Please consider voting for the bot once in a while')
        .setTimestamp();
      message.reply({
        embeds: [spechelpembed],
        allowedMentions: {
          "parse": []
        }
      });
    }

  },
};