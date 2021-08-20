const { color } = require("../../config.json");
const Discord = require("discord.js");
const { readFile } = require("fs");
const players = new Discord.Collection();

module.exports = {
  name: "hangman",
  description: "The classic hangman game here .",
  usage: "e;hangman",
  cooldown: 40,
  guildOnly: true,
  permissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "MANAGE_MESSAGES", "EMBED_LINKS"],
  aliases: ["hm"],
  run: async (client, message) => {
    if (players.has(message.author.id)) {
      const completeGame = new Discord.MessageEmbed()
        .setColor(color)
        .setTimestamp()
        .setDescription(`<@${message.author.id}> Woah <a:fun1:872887524652118056> , wait a moment , you have a game already going on , how about you finish that first before starting another.`);
      return message.reply({
        embeds: [completeGame]
      });
    };

    try {
      let word = "";
      const timeoutEmbed = new Discord.MessageEmbed()
        .setDescription(`:clown: The game is closed due to inactivity.`)
        .setColor(color)
        .setTimestamp();
      let gameMode, showString;
      let misses = [];
      const figures = [
        "```\n    +---+\n    |   |\n        |\n        |\n        |\n        |\n‾‾‾‾‾‾‾‾‾```",
        "```\n    +---+\n    |   |\n    O   |\n        |\n        |\n        |\n‾‾‾‾‾‾‾‾‾```",
        "```\n    +---+\n    |   |\n    O   |\n   /|   |\n        |\n        |\n‾‾‾‾‾‾‾‾‾```",
        "```\n    +---+\n    |   |\n    O   |\n   /|\\  |\n        |\n        |\n‾‾‾‾‾‾‾‾‾```",
        "```\n    +---+\n    |   |\n    O   |\n   /|\\  |\n   /    |\n        |\n‾‾‾‾‾‾‾‾‾```",
        "```\n    +---+\n    |   |\n    O   |\n   /|\\  |\n   / \\  |\n        |\n‾‾‾‾‾‾‾‾‾```",
      ];
      const lives = ["```♡♡♡♡♡```", "```♡♡♡♡_```", "```♡♡♡__```", "```♡♡___```", "```♡____```", "```_____```"];
      let counter = 0;
      readFile("./utilities/words.txt", "utf-8", async (err, data) => {
        let rights = 0;
        let wrongs = 0;
        rightsArray = [];
        wrongArray = [];
        //fetch word
        wordsList = await data.split("\n");
        const word = wordsList[Math.floor(Math.random() * 394)];
        //fetch word
        const winEmbed = new Discord.MessageEmbed()
          .setColor("#00FF00")
          .setDescription(`<a:win:876189343134388274><a:win:876189343134388274> Congratulations <@${message.author.id}> <a:win:876189343134388274><a:win:876189343134388274> \nYou\'ve won the game . The word was **${word}** .\n\nA leaderboard will be made soon where ya can globally flex your wins .`)
          .setTimestamp();
        const loseEmbed = new Discord.MessageEmbed()
          .setDescription(`<a:sed:876204739182874686> It\'s okay , If you lost once doesn\'t mean you can't win on next try . \n The word was **${word}** .\nMaybe try again ? <:plead:876229030775492708>`)
          .setColor("#FF0000")
          .setTimestamp()
        if (misses.length) {
          missesString = misses.join(" , ");
        } else {
          missesString = "\`_\` \`_\` \`_\` \`_\` \`_\`";
        }
        players.set(message.author.id, "hangman");
        const indexRandom = Math.floor(Math.random() * 7) + 1;
        let show = ["`_`", "`_`", "`_`", "`_`", "`_`", "`_`", "`_`", "`_`", "`_`", "`_`"];
        show[0] = word.charAt(0);
        show[9] = word.charAt(9);
        rightsArray.push(word.charAt(0), word.charAt(9), word.charAt(indexRandom));
        show[indexRandom] = word.charAt(indexRandom);
        showString = show.join(" ");
        const embed2 = new Discord.MessageEmbed()
          .setDescription("WORD   -    " + showString + "\n" + "LIVES - " + lives[counter] + "\n" + "MISSES - " + missesString + "\n" + figures[counter])
          .setColor(color)
          .setFooter("Goodluck!!!");
        let sent2 = await message.reply({
          embeds: [embed2],
        });
        const filter2 = m => m.author.id === message.author.id;
        const collector2 = message.channel.createMessageCollector({
          filter2,
          time: 60000,
        })
        collector2.on("collect", m => {
          collector2.resetTimer({
            time: 60000,
          });
          if (m.content.length === 1 && m.content.toLowerCase().charCodeAt(0) >= 97 && m.content.toLowerCase().charCodeAt(0) <= 122) {
            m.delete().catch((e)=>{});
            const char = m.content.toLowerCase();
            if (word.includes(char) && !rightsArray.includes(char)) {
              rightsArray.push(char);
              rights++;
              let indexChar = word.indexOf(char);
              show[indexChar] = `\`${char}\``;
              showString = show.join(" ");
              embed = new Discord.MessageEmbed()
                .setDescription("WORD   -    " + showString + "\n" + "LIVES - " + lives[counter] + "\n" + "MISSES - " + missesString + "\n" + figures[counter])
                .setColor("#00FF00")
                .setFooter("Aah , you goin\' good!!!")
              sent2.edit({
                embeds: [embed],
              }).catch((e) => { });
            } else if (!wrongArray.includes(char) && !rightsArray.includes(char)) {
              wrongs++;
              wrongArray.push(char);
              counter++;
              misses.push(`\`${char}\``);
              missesString = misses.join(" , ");
              embed = new Discord.MessageEmbed()
                .setDescription("WORD   -    " + showString + "\n" + "LIVES - " + lives[counter] + "\n" + "MISSES - " + missesString + "\n" + figures[counter])
                .setColor("#FF0000")
                .setFooter("Oops , wrong guess")
              sent2.edit({
                embeds: [embed],
              }).catch((e) => { });
            }
          }
          if (rights === 7 || wrongs === 5) collector2.stop();

        });
        collector2.on("end", () => {
          players.delete(message.author.id);
          if (rights === 7) {
            sent2.delete().catch((e)=>{});
            message.channel.send({
              embeds: [winEmbed],
            });
          } else if (wrongs === 5) {
            sent2.delete().catch((e)=>{});
            message.channel.send({
              embeds: [loseEmbed],
            });
          } else {
            sent2.delete().catch((e)=>{});
            message.channel.send({
              embeds: [timeoutEmbed],
            })
          }
        });

        return;
      });
    } catch (e) {
      console.log(e.message);
      message.reply({
        embeds: [new Discord.MessageEmbed().setColr(color).setTimestamp().setDescription("Oops ! something went wrong while building your game , please try again later.\nSorry for inconvenience.")]
      });
    };
  }
}
