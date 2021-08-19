const Discord = require('discord.js');
const Path = require('path');
const giffildb = require('../../models/giffilmodel');
require("mongoose");

const { color, botpfp } = require("../../config.json");

const baseembed = new Discord.MessageEmbed().setColor(color).setTimestamp()

module.exports = {
  name: 'giffil',
  aliases: ['gfil', 'gfilter'],
  description: 'Provide filter options for the GIFs sent to server in `e;gif` command . Can be only used by members with **ADMINISTRATOR** permissions ',
  cooldown: 0,
  permissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS"],
  data: {
    name: "gif_filter",
    description: "Set a filter over GIFs you recieve in server while using GIF comamnd or see how command works",
    options: [
      {
        name: "filter",
        description: "Choose the filter",
        type: "STRING",
        required: false,
      },
      {
        name: "help",
        description: "Get to know how to set GIf filters.",
        type: "BOOLEAN",
      }
    ],
  },
  usage: '`e;giffil <filter chosen>`',
  guildOnly: true,
  run: async (client, message, args) => {
    async function giffil(message, args) {
      const guildid = message.guild.id;
      if (!message.member.permissionsIn(message.channel).has('ADMINISTRATOR')) {
        const embedz = baseembed.setDescription('Only Users with **ADMINISTRATOR** permission can use this command.')
        return message.reply({
          embeds: [embedz],
          reply: { messageReference: message.Id }
        });
      } else {
        if (!args || args.length === 0) {
          const filt = await giffildb.findOne({
            guildid: guildid,
          });


          if (filt) {
            const filEmbed = new Discord.MessageEmbed()
              .setColor(color)
              .setDescription('Our filters are designed to map to the MPAA though important to note we do not provide the type of nudity that may be found in R rated films . Please choose the filter you would like - ')
              .addFields(
                { name: 'Default is filter `medium` ', value: 'Change it using command `e;giffil <filter you want to apply>` ' },

                { name: 'Filter Set Right Now: ', value: `${filt.filter}` } ,

              )
              .setImage('https://imgur.com/kTX6J6C.png')
              .setFooter('Please consider voting for the bot once in a while')
              .setThumbnail(botpfp)
              .setTimestamp();
            message.reply({
              embeds: [filEmbed],
              reply: { messageReference: message.Id }
            });
          } else {
            const filEmbed = new Discord.MessageEmbed()
              .setColor(color)
              .setDescription('Our filters are designed to map to the MPAA though important to note we do not provide the type of nudity that may be found in R rated films . Please choose the filter you would like - ')
              .addFields(
                { name: 'Default is filter `medium` ', value: 'Change it using command `e;giffil <filter you want to apply>` ' },

              )
              .setImage('https://imgur.com/kTX6J6C.png')
              .setFooter('Please consider voting for the bot once in a while')
              .setThumbnail(botpfp)
              .setTimestamp();
            message.reply({
              embeds: [filEmbed],
              reply: { messageReference: message.Id }
            })

          };
        } else if (args.length !== 1 && args.length !== 0) {
          const embeda = baseembed.setDescription("Please do not put extra words other than filter choice . \n Like for high option , type `e;giffil high`");
          return message.reply({
            embeds: [embeda],
            reply: { messageReference: message.Id }
          });
        } else if (args.length === 1) {
          const filnew = args[0];
          const filold = await giffildb.findOne({
            guildid: guildid,
          });
          if (filnew === 'low' || filnew === 'off' || filnew === 'medium' || filnew === 'high') {
            await new giffildb({
              guildid: guildid,
              filter: filnew,
            }).save();
            if (filold) {
              await giffildb.deleteOne({
                guildid: guildid,
                filter: filold.filter,
              });
              const embedb = baseembed.setDescription('Settings Updated Succesfully !!!\nYou can change them anytime.')
              message.reply({
                embeds: [embedb],
                reply: { messageReference: message.Id }
              });

            } else {
              const embede = baseembed.setDescription('Settings Saved Succesfully !!!\nYou can change them anytime.')
              message.reply({
                embeds: [embede],
                reply: { messageReference: message.Id }
              });
            }
          } else {
            const embedf = baseembed.setDescription("Please choose correct option . \n like for high option , type `e;giffil high`")
            message.reply({
              embeds: [embedf],
              reply: { messageReference: message.Id }
            });
          }
        }
      }
    }
    giffil(message, args);

  }//end of execute
}
