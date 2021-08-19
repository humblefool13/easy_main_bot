const Discord = require("discord.js");
const emojipack = require("get-emojis-from-string");
const autoreact = require('../../models/autoreactmodel');
require("mongoose");
const { color } = require("../../config.json");

const baseembed = new Discord.MessageEmbed().setColor(color).setTimestamp()


module.exports = {
  name: "autoreact",
  aliases: ["ar", "autor", "areact"],
  description: "Set an emoji / emote to be reacted by the bot in any message that mentions you . Emoji/emote should be a discord default or a custom emoji/emote of the server command is initiated in.\n`e;autoreact rem` to remove the already set emoji/emote.",
  usage: '`e;autoreact <emoji/emote>`',
  cooldown: 60,
  permissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "ADD_REACTIONS", "EMBED_LINKS"],
  args: true,
  guildOnly: true,
  run: async (client, message, args) => {
    try {
      if (message.deleted) return message.channel.send({
        embeds: [baseembed.setDescription("Please don't use a webhook for running commands .\n Thank you")]
      })
      const guildid = message.guild.id;
      const emojis = emojipack(message.content);
      if (args[0] === "rem") {
        const found = await autoreact.findOne({
          guildid: guildid,
          userid: message.author.id,
        });
        if (!found) {
          const embeda = baseembed.setDescription("You have not set up an emoji/emote in this server already.");
          return message.reply({
            embeds: [embeda],
            failIfNotExists: false,
          });
        } else {
          await autoreact.deleteOne({
            guildid: guildid,
            userid: message.author.id,
          }).then(() => {
            embedb = baseembed.setDescription("Your stored emoji/emote is successfully deleted .\nYou can add a new one anytime using the `e;autoreact` command.");
            return message.reply({
              embeds: [embedb],
              failIfNotExists: false,
            });
          })
        }
        return;
      };
      if (!emojis.length) return message.reply({
        embeds: [baseembed.setDescription("Run that command again but this time give me an emoji/emote as well .")],
        failIfNotExists: false,
      });

      const emoji = emojis[0];
      const emojiId = emoji.id;
      if (emoji.type === "Discord Emoji" && (!message.guild.emojis.cache.has(emojiId))) {
        const embede = baseembed.setDescription("The emoji/emote should be of this server or a default discord emoji.");
        return message.reply({
          embeds: [embede],
          failIfNotExists: false,
        });
      };
      message.react(emojiId).catch(e => {
        if (e.message === "Missing Permissions") {
          const embedf = baseembed.setDescription("I don\'t have permissions to react to messages in this channel but I am saving your emote/emoji for other channels where I have permissions .");
          message.reply({
            embeds: [embedf],
            failIfNotExists: false,
          });
        } else {
          const embedg = baseembed.setDescription("Invalid emoji/emote .\nCheck `e;help autoreact`");
          return message.reply({
            embeds: [embedg],
            failIfNotExists: false,
          });
        }
      });
      if (emoji.type === "Discord Emoji" && emoji.animated === true) {
        const show = `<a:${emoji.name}:${emojiId}>`;
        const found = await autoreact.findOne({
          guildid: guildid,
          userid: message.author.id,
        });
        if (!found) {
          await new autoreact({
            guildid: guildid,
            emoji: emojiId,
            userid: message.author.id,
          }).save();
          const embedh = baseembed.setDescription('Emoji/Emote successfully set to : ' + show);
          message.reply({
            embeds: [embedh],
            failIfNotExists: false,
          });
        } else {
          await autoreact.updateOne({
            guildid: guildid,
            userid: message.author.id,
          }, {
              $set: { emoji: emojiId },
            });
          const embedi = baseembed.setDescription("Emoji/emote successfully updated to : " + show);
          return message.reply({
            embeds: [embedi],
            failIfNotExists: false,
          });
        };
      } else if (emoji.type === "Discord Emoji" && emoji.animated === false) {
        const show = `<:${emoji.name}:${emojiId}>`;
        const found = await autoreact.findOne({
          guildid: guildid,
          userid: message.author.id,
        });
        if (!found) {
          await new autoreact({
            guildid: guildid,
            emoji: emojiId,
            userid: message.author.id,
          }).save();
          const embedh = baseembed.setDescription('Emoji/Emote successfully set to : ' + show);
          message.reply({
            embeds: [embedh],
            failIfNotExists: false,
          });
        } else {
          await autoreact.updateOne({
            guildid: guildid,
            userid: message.author.id,
          }, {
              $set: { emoji: emojiId },
            });
          const embedi = baseembed.setDescription("Emoji/emote successfully updated to : " + show);
          return message.reply({
            embeds: [embedi],
            failIfNotExists: false,
          });
        };
      } else if (emoji.type === "Default Emoji") {
        const show = emojiId;
        const found = await autoreact.findOne({
          guildid: guildid,
          userid: message.author.id,
        });
        if (!found) {
          await new autoreact({
            guildid: guildid,
            emoji: emojiId,
            userid: message.author.id,
          }).save();
          const embedh = baseembed.setDescription('Emoji/Emote successfully set to : ' + show);
          message.reply({
            embeds: [embedh],
            failIfNotExists: false,
          });
        } else {
          await autoreact.updateOne({
            guildid: guildid,
            userid: message.author.id,
          }, {
              $set: { emoji: emojiId },
            });
          const embedi = baseembed.setDescription("Emoji/emote successfully updated to : " + show);
          return message.reply({
            embeds: [embedi],
            failIfNotExists: false,
          });
        };
      }
    } catch (e) {
      console.log(e.message);
    }
  }//run
}//module.exports