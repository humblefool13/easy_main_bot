const Discord = require('discord.js');

const { color } = require("../../config.json")
const baseembed = new Discord.MessageEmbed().setColor(color).setTimestamp()

module.exports = {
  name: 'embed',
  cooldown: 120,
  guildOnly: true,
  args: false,
  permissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "MANAGE_MESSAGES", "EMBED_LINKS"],
  aliases: ['emb', 'ec'],
  description: 'Want a customized embed in any channel of your server ? Try our embed creater . \n**Can be only used by members with ADMINISTRATOR or MANAGE MESSAGES or MANAGE GUILD permissions .**\nCannot use external emojis/emotes.',
  async run(client, message) {
    let permsreq = [];
    if (message.member.permissionsIn(message.channel).has("ADMINISTRATOR") || message.member.permissionsIn(message.channel).has("MANAGE_MESSAGES") || message.member.permissionsIn(message.channel).has("MANAGE_GUILD")) {

      let sentid = "";

      let allanswers = true;
      let goon = true;
      let answers = [];

      const questions = [
        '*have 2 minutes to give answers to each property of embed*\n\nMention the channel:',
        'HEX CODE of color of embed (with #):',
        'Title of Embed:',
        'URL in TITLE: ',
        'Want to display your profile as AUTHOR? \nWrite `true` if yes , else `skip`:',
        'Description in embed:',
        'Thumbnail of embed: ',
        'Image you would like to provide with embed:',
        'Footer of embed:',
        'Need timestamp? \nWrite `true` if yes else `skip `:'
      ];
      let counter = 0;

      const filter = m => m.author.id === message.author.id;

      const collector = new Discord.MessageCollector(message.channel,
        {
          filter,
          max: questions.length,
          time: 1000 * 120,
        })

      const collectorEmbed = new Discord.MessageEmbed()
        .setTitle('EASY embed creator :')
        .setColor(color)
        .setDescription(questions[counter++])
        .setFooter('Type \'skip\' to leave this field empty or \'cancel\' to stop making the embed .')
        .setTimestamp();
      sentmsg = await message.channel.send({ embeds: [collectorEmbed] });

      collector.on('collect', async (m) => {
        m.delete();
        sentmsg.delete();
        if (m.content === 'cancel') {
          collector.stop();
          return message.channel.send({
            embeds: [baseembed.setDescription('Cancelled making the embed :+1:')]
          });
        }
        if (counter < questions.length) {
          let collectorEmbedb = new Discord.MessageEmbed()
            .setTitle('EASY embed creator :')
            .setColor(color)
            .setDescription(questions[counter++])
            .setFooter('Type \'skip\' to leave this field empty or \'cancel\' to stop making the embed .')
            .setTimestamp();
          sentmsg = await m.channel.send({ embeds: [collectorEmbedb] });
          collector.resetTimer({
            time: 120000
          });
        }
      })



      collector.on('end', collected => {
        let counter = 0;
        if (collected.size !== questions.length) {
          return message.channel.send({
            embeds: [baseembed.setDescription('You did not answer all the questions in given time \nor you cancelled making embed .')]
          })
          return allanswers = false;
        } else {
          collected.forEach((value) => {
            answers[counter++] = value;
          });



          try {
            if (answers[0].mentions.channels && answers[0].mentions.channels.first().type === 'GUILD_TEXT' && allanswers !== false) {
              const cid = answers[0].mentions.channels.first().id;

              const embed = new Discord.MessageEmbed()
              if (answers[1].content !== 'skip' && answers[1].content.length === 7 && answers[1].content.startsWith('#')) {
                embed.setColor(answers[1].content)
              };
              if (answers[2].content !== 'skip' && (answers[2].content.length)) {
                embed.setTitle(answers[2].content)
              };
              if (answers[3].content !== 'skip' && (answers[3].content.length) && answers[3].content.startsWith('https://')) {
                embed.setURL(answers[3].content)
              };
              if (answers[4].content === 'true') {
                embed.setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: false }))
              };
              if (answers[5].content !== 'skip' && (answers[5].content.length)) {
                embed.setDescription(answers[5].content)
              };


              if (answers[6].content !== 'skip' && answers[6].content.startsWith('https://') && (answers[6].content.includes('jpg') || answers[6].content.includes('jpeg') || answers[6].content.includes('png') || answers[6].content.includes('webp') || answers[6].content.includes('gif'))) {
                embed.setThumbnail(answers[6].content);
              } else if (answers[6].content !== 'skip' && (answers[6].attachments) && (answers[6].attachments.first().url.endsWith('.PNG') || answers[6].attachments.first().url.endsWith('.JPG') || answers[6].attachments.first().url.endsWith('.WEBP') || answers[6].attachments.first().url.endsWith('.JPEG') || answers[6].attachments.first().url.endsWith('.GIF'))) {
                embed.setThumbnail(answers[6].attachments.first().url);
              };



              if (answers[7].content !== 'skip' && answers[7].content.startsWith('https://') && (answers[7].content.includes('jpg') || answers[7].content.includes('jpeg') || answers[7].content.includes('png') || answers[7].content.includes('webp') || answers[7].content.includes('gif'))) {
                embed.setImage(answers[7].content);
              } else if (answers[7].content !== 'skip' && (answers[7].attachments) && (answers[7].attachments.first().url.endsWith('.PNG') || answers[7].attachments.first().url.endsWith('.JPG') || answers[7].attachments.first().url.endsWith('.WEBP') || answers[7].attachments.first().url.endsWith('.JPEG') || answers[7].attachments.first().url.endsWith('.GIF'))) {
                embed.setImage(answers[7].attachments.first().url);
              };


              if (answers[8].content !== 'skip' && (answers[8].content.length)) {
                embed.setFooter(answers[8].content)
              };
              if (answers[9].content === 'true') {
                embed.setTimestamp();
              };

              client.channels.cache.get(cid).send({ embeds: [embed] }).then((sent) => {
                message.channel.send({
                  embeds: [baseembed.setDescription(`Embed Created Successfully!\n[here](${sent.url})\n\nIf the image/gif is not loading , you\'ve provided a wrong format .`)]
                })
              }).catch((e) => {
                if (e.message === "Missing Access") {
                  return message.reply({
                    embeds: [baseembed.setDescription("I am sorry but I can't really create a message in that channel because of not having permissions.")]
                  })
                }
              })
            }
          } catch (error) {
            console.log(error);
            return message.channel.send({
              embeds: [baseembed.setDescription('Please enter all fields correctly .\nEspecially provide correct format of image/gif\n\nSupported formats : `.gif , .webp  , .png , .jpeg , .jpg`')]
            });
          }

        };//else
      });//end event



    } else {
      message.reply({
        embeds: [baseembed.setDescription('Only users with **ADMINISTRATOR** or **MANAGE MESSAGES** or **MANAGE GUILD** permissions can use this command .')],
        reply: { messageReference: message.id },
      });
    }

  }//run

}//module.exports

