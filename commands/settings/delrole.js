const Discord = require('discord.js');
const roleperms = require('../../models/rolepermsmodel');
require("mongoose");
const { color } = require("../../config.json");

const baseembed = new Discord.MessageEmbed().setColor(color).setTimestamp()

module.exports = {
  name: 'delrole',
  description: 'Remove the authorized roles who can use the command provided . Can only remove a role at a time .',
  cooldown: 0,
  usage: '`e;delrole <command name> <mention role/give id>`',
  permissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS"],
  guildOnly: true,
  args: true,
  run: async (client, message, args) => {
    try {
      const random = 0;
      const guildid = message.guild.id;
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
          if (!found) {
            const embedc = baseembed.setDescription("This role was never authorized to use the command.")
            return message.reply({
              embeds: [embedc],
            });

          } else {
            await roleperms.deleteOne({
              guildid: guildid,
              command: command,
              roleid: roleid,
            });
            const embedd = baseembed.setDescription("The role is successfully deauthorized from using the " + command + " command.")
            return message.reply({
              embeds: [embedd],
            });
          }

        } else {
          const roleid = args[1];
          if (!message.guild.roles.cache.has(roleid)) {
            const embede = baseembed.setDescription("Please provide a valid role ID of this server .")
            return message.reply({
              embeds: [embede],
            });
          }

          const found = await roleperms.findOne({
            guildid: guildid,
            command: command,
            roleid: roleid,
          });
          if (!found) {
            const embedf = baseembed.setDescription("This role was never authorized to use the command.")
            return message.reply({
              embeds: [embedf],
            });

          } else {
            await roleperms.deleteOne({
              guildid: guildid,
              command: command,
              roleid: roleid,
            });
            const embedg = baseembed.setDescription("The role is successfully deauthorized from using the " + command + " command.")
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
      message.reply({ content: "Something went wrong while removing the role permission." });
    }


  }//run
}//module.exports