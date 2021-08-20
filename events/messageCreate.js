const { prefix, color, botpfp } = require('../config.json');

const Discord = require('discord.js');
const cooldowns = new Discord.Collection();
const roleperms = require('../models/rolepermsmodel');
const autoreact = require('../models/autoreactmodel');
require("mongoose");

const baseembed = new Discord.MessageEmbed().setColor(color).setTimestamp()


module.exports = {
  name: 'messageCreate',
  once: false,
  async execute(client, message) {

    let roles_permittednew = [];

    if (message.author.bot) return;

    const guildid = message.guild.id;

    const smartembed = new Discord.MessageEmbed()
      .setTitle("EASY AUTOREACT-")
      .setColor(color)
      .setThumbnail(botpfp)
      .setDescription("For server - " + message.guild.name + "\n\nYou don\'t have a role permitted to use autoreact . \nSorry , deleting your emoji/emote react data . \nTo use it in this server get any of roles permitted , you can see permitted roles using `e;showroles autoreact` command in the server.")
      .setTimestamp();

    const delembed = new Discord.MessageEmbed()
      .setTitle("EASY AUTOREACT-")
      .setColor(color)
      .setThumbnail(botpfp)
      .setDescription('The emoji/emote you stored for autoreact was deleted from this server - ' + message.guild.name + ' . \nSet a new one using `e;autoreact` command')
      .setTimestamp();



    try {


      if (message.mentions.members.size) {

        message.mentions.members.each(async (member) => {
          let check = false;

          const find = await autoreact.findOne({
            guildid: guildid,
            userid: member.id,
          });

          if (find) {


            const emoji = find.emoji;

            const allowed = await roleperms.find({
              guildid: guildid,
              command: "autoreact",
            });

            if (allowed.length) {
              allowed.forEach(field => {
                let roleid = field.roleid;
                if (member.roles.cache.has(roleid)) check = true;
              });

              if (check) {
                message.react(emoji).catch(async (e) => {
                  if (e.message !== "Missing Permissions") {
                    await autoreact.deleteOne({
                      guildid: guildid,
                      userid: member.id,
                    });

                    member.user.send({ embeds: [delembed] });
                  }
                });
              } else {
                member.user.send({ embeds: [smartembed] });
                await autoreact.deleteOne({
                  guildid: guildid,
                  userid: member.id,
                }).then(member.user.send({ embeds: [baseembed.setDescription("Deleted successfully. :pensive:")] }));
              }

            } else {
              message.react(emoji).catch(async (e) => {
                if (e.message !== "Missing Permissions") {
                  await autoreact.deleteOne({
                    guildid: guildid,
                    userid: member.id,
                  });

                  member.user.send({ embeds: [delembed] });
                }

              });
            }

          }
        })
      }//mentions

    } catch (e) {
      console.log(e);
    }

    if (message.content === `<@!${client.user.id}>` || message.content === `<@${client.user.id}>`) message.channel.send({ embeds: [baseembed.setDescription(`My Prefix is: **\`${prefix}\`**   , \ntype \`${prefix}help\` for more information!`)] });

    if (!message.content.startsWith(prefix)) return

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) {
      if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
      };
      if (!message.member.permissionsIn(message.channel).has("ADMINISTRATOR")) {
        const commandn = command.name;
        let found = false;
        const guildid = message.guild.id;
        const roles_permitted = await roleperms.find({
          guildid: guildid,
          command: commandn,
        });

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


          roles_permittednew.forEach((field) => {
            let id = field.roleid;
            if (message.member.roles.cache.has(id)) found = true;
          });
          if (found === false) return message.reply({
            embeds: [baseembed.setDescription("You are not authorized to use this command in this server . Use `e;showroles <command>` to see roles that can use this command.")],

            reply: { messageReference: message.Id }

          });
        };
      };



      if (message.author.id !== '727498137232736306') {

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown) * 1000;

        if (timestamps.has(message.author.id)) {
          const expirationTime =
            timestamps.get(message.author.id) + cooldownAmount;
          if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply({
              embeds: [baseembed.setDescription(`Please wait ${timeLeft} more second(s) before reusing the \`${command.name}\` command.`)]
            }

            );
          }
        }
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
      }

      if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply({
          embeds: [baseembed.setDescription('I can\'t execute that command inside DMs!')]
        });

      };
      let permsreq = [];
      const perms = command.permissions;
      perms.forEach((perm) => {
        if (!message.channel.permissionsFor(client.user).has(perm)) permsreq.push(perm);
      });
      if (permsreq.length) {
        let permsname = permsreq.join("\n➟ ");
        permsname = "➟ " + permsname;
        return message.channel.send({
          embeds: [baseembed.setDescription("Missing permissions to use this command in this channel : \n" + permsname)]
        })
      }

      try {
        command.run(client, message, args);
      } catch (e) {
        console.log(e);
        message.reply({
          embeds: [baseembed.setDescription("Something went wrog while executing the command.")],
        })
      }


    } else return;
  },
};