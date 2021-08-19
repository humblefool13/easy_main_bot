const Discord = require('discord.js');
const roleperms = require('../../models/rolepermsmodel');
require("mongoose");
const { color } = require("../../config.json");
const baseembed = new Discord.MessageEmbed().setColor(color).setTimestamp()

module.exports = {
  name: "showroles",
  description: "Show all the roles authorized in the server to use a specific command.",
  usage: '`e;showroles <command name>`',
  aliases: ['show'],
  cooldown: 20,
  permissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS"],
  guildOnly: true,
  args: true,
  run: async (client, message, args) => {

    let roles_permittednew = [];
    if (args.length !== 1) {
      const embeda = baseembed.setDescription("You need to check `e;help showroles`")
      return message.reply({
        embeds: [embeda],
      });
    }
    let command = client.commands.get(args[0].toLowerCase());
    if (!command) command = client.commands.get(client.aliases.get(args[0].toLowerCase()));
    if (!command) {
      const embedb = baseembed.setDescription('Error 404 : Command Not Found.\n\nUse `e;help` to get a list of all commands.')
      return message.reply({
        embeds: [embedb],
      });
    }

    command = command.name;
    const guildid = message.guild.id;
    const roles_permitted = await roleperms.find({
      guildid: guildid,
      command: command,

    });
    let role_names = [];
    if (roles_permitted.length) {


      roles_permitted.forEach(async (field) => {
        let id = field.roleid;
        if (!client.guilds.cache.get(guildid).roles.cache.has(id)) {
          await roleperms.deleteMany({
            guildid: guildid,
            roleid: id,
          });

        } else {
          roles_permittednew.push(field);
        }
      })



      await roles_permittednew.forEach(field => role_names.push(message.guild.roles.cache.get(field.roleid).name));
      let roles = role_names.join("\n➟ ");
      roles = "➟ " + roles;
      const roleembed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle("Easy Role lock -")
        .setDescription(`These are the roles permitted to use the command in this server -`)
        .addField(`Command Name : ${command}`, roles)
        .setTimestamp();

      return message.reply({
        embeds: [roleembed]
      });
    } else {
      const embedz = baseembed.setDescription("Everyone in this server can use this command.")
      message.reply({
        embeds: [embedz]
      });
    }


  }//run
}//module.exports