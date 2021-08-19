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
  data: {
    name: "autoreact",
    description: "Set an emoji/emote for autoreact upon a message mention",
    options: [
      {
        name: "emoji_or_emote",
        description: "The emoji/emote chosen to be set for autoreact",
        type: "STRING",
        required: true,
      },
      {
        name: "remove",
        description: "Write 'true' to remove your set autoreact data.",
        type: "STRING",
        required: true,
      },
    ],
  },
  permissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "ADD_REACTIONS", "EMBED_LINKS"],
  args: true,
  guildOnly: true,
  /*interact : async (client , interaction) => {
    const guildid = interaction.guild.id;
    const input = interaction.options.getString("emoji_emote") || interactions.options.getString("remove");
    if(input === "true" ) {
      await autoreact.deleteOne({
        guildid : guildid,
        userid : interaction.user.id,
      }).then({
        return interaction.reply({
          embeds : [baseembed.setDescription("Successfully deleted the autoreact data")],
          ephemeral : true,
        })
      }).catch({
        return interaction.reply({
          embeds : [baseembed.setDescription("You haven't set up an emoji/emote for autoreact already.")],
          ephemeral : true,
        })
      });
    } else if ( input = "false" ) {
      return interaction.reply({
        embeds : [baseembed.setDescription("Disappointing :pensive:")],
        ephemeral : true,
      })
    } else {
      const emojis = emojipack(input);
      if(!emojis.length) return interaction.reply({embeds : [baseembed.setDescription("Please provide me an emoji/emote as well next time.")]});
      const check = await autoreact.findOne({
        guildid : guildid ,
        userid : interaction.user.id,
      });
      if(check) {
        new autoreact({
          guildid : guildid,
          userid : interaction.user.id,
        }).save();
      }
    }
  }*/
}