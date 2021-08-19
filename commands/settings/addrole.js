const Discord = require('discord.js');
const roleperms = require('../../models/rolepermsmodel');
require("mongoose");
const { color } = require("../../config.json");

const baseembed = new Discord.MessageEmbed().setColor(color).setTimestamp()

module.exports = {
  name: 'addrole',
  description: 'Add roles of server which can use a particular command , if not restricted everyone can use the command . Can only add a role at a time .\n',
  cooldown: 0,
  usage: '`e;addrole <command name> <mention role/give id>`',
  guildOnly: true,
  permissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS"],
  args: true,
  run: async (client, message, args) => {
    try {

      const random = 0;
      if (message.member.permissionsIn(message.channel).has("ADMINISTRATOR") || message.member.permissionsIn(message.channel).has("MANAGE_ROLES")) {

        if (args.length !== 2) {
          const embeda = baseembed.setDescription("You need to check `e;help addrole`");
          return message.reply({
            embeds: [embeda],
          });
        }
        const guildid = message.guild.id;
        let command = client.commands.get(args[0].toLowerCase());
        if (!command) command = client.commands.get(client.aliases.get(args[0].toLowerCase()));
        if (!command) {
          const embedb = baseembed.setDescription('Error 404 : Command Not Found.\n\nUse `e;help` to get a list of all commands.');
          return message.reply({
            embeds: [embedb],
          })
        }

        command = command.name;


        if (message.mentions.roles.size) {
          const roleid = message.mentions.roles.firstKey();
          const found = await roleperms.findOne({
            guildid: guildid,
            command: command,
            roleid: roleid,
          });
          if (found) {
            const embedc = baseembed.setDescription("This role is already authorized to use this command.")
            return message.reply({
              embeds: [embedc],
            });
          } else {
            await new roleperms({
              guildid: guildid,
              command: command,
              roleid: roleid,
            }).save();
            const embedd = baseembed.setDescription("Role successfully authorized to use " + command + " command.")
            return message.reply({
              embeds: [embedd],
            });

          }



        } else {
          const roleid = args[1];
          if (!message.guild.roles.cache.has(roleid)) {
            embede = baseembed.setDescription("Please provide a valid role ID of this server .")
            return message.reply({
              embeds: [embede],
            });
          }

          const found = await roleperms.findOne({
            guildid: guildid,
            command: command,
            roleid: roleid,
          });
          if (found) {
            const embedf = baseembed.setDescription("This role is already authorized to use this command.")
            return message.reply({
              embeds: [embedf],
            })
          } else {
            await new roleperms({
              guildid: guildid,
              command: command,
              roleid: roleid,
            }).save();
            const embedg = baseembed.setDescription("Role successfully authorized to use " + command + " command.")
            return message.reply({
              embeds: [embedg],
            });
          }
        }
      } else {
        const embedh = baseembed.setDescription("Sorry , you need **ADMINISTRATOR** or **MANAGE ROLES** permission to use this command.")
        message.reply({
          embeds: [embedh],
        })
      }
    } catch (e) {
      console.log(e);
      message.reply({
        content: "Something went wrong authorizing the role."
      })
    }
  }//run
};//module.exports