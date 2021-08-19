const { color, botpfp } = require("../../config.json");

const Discord = require("discord.js");

module.exports = {
  name: 'vote',
  cooldown: 20,
  guildOnly: false,
  description: 'Voting for bot in public bot lists.',
  usage: '`e;vote`',
  data: {
    name: "vote",
    description: "To get public bot listing site links to vote for bot"
  },
  permissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS"],
  interact: (client, interaction, args) => {
    const embed = new Discord.MessageEmbed()
      .setColor(color)
      .setThumbnail(botpfp)
      .addFields(
        { name: 'Vote for the `easy` bot and help us grow :', value: '[Top.gg](https://top.gg/bot/844656815627436112/vote "Click here to vote on top.gg")\n[Discord Extreme List](https://discordextremelist.xyz/en-US/bots/844656815627436112 "Click here to vote on DEL")\n[Discord Bot List](https://discordbotlist.com/bots/easygif-2111/upvote "Click here to vote on DBL")\n[Discord Boats](https://discord.boats/bot/844656815627436112/vote "Click here to vote on discord boats.")' }
      )
      .setFooter('Thanks for voting <3 !')
      .setTimestamp();
    interaction.reply({
      embeds: [embed],
      allowedMentions: { replpiedUser: false },
    });
  }
}