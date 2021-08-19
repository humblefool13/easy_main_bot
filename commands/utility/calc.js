const Discord = require('discord.js');
const solve = require("math-expression-evaluator");

module.exports = {
  name: 'calc',
  category: 'Calculator',
  aliases: ['math', 'cal'],
  description: 'A basic calculator for your needs . You can add , subtract , multiply , divide , ...',
  cooldown: 150,
  permissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS", "MANAGE_MESSAGES"],
  usage: 'Doesn\'t need it , just run the command',
  guildOnly: false,
  args: true,
  data: {
    name: "calculator",
    description: "Get a calculator that functions for a 1.5 minutes",
  },
  run: async (client, message, args) => {
    const content = "```FUNCTIONAL FOR 1.5 MINUTES . WRONG EXPRESSIONS EQUIVALENT TO AC```";

    const row1 = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
          .setCustomId("+")
          .setLabel("+")
          .setStyle("SECONDARY"),
        new Discord.MessageButton()
          .setCustomId("e")
          .setLabel("e")
          .setStyle("SECONDARY"),
        new Discord.MessageButton()
          .setCustomId("pi")
          .setLabel("π")
          .setStyle("SECONDARY"),
        new Discord.MessageButton()
          .setCustomId("log")
          .setLabel("log")
          .setStyle("SECONDARY"),
        new Discord.MessageButton()
          .setCustomId("AC")
          .setLabel("AC")
          .setStyle("PRIMARY"),
      );
    const row2 = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
          .setCustomId("-")
          .setLabel("-")
          .setStyle("SECONDARY"),
        new Discord.MessageButton()
          .setCustomId("7")
          .setLabel("7")
          .setStyle("SECONDARY"),
        new Discord.MessageButton()
          .setCustomId("8")
          .setLabel("8")
          .setStyle("SECONDARY"),
        new Discord.MessageButton()
          .setCustomId("9")
          .setLabel("9")
          .setStyle("SECONDARY"),
        new Discord.MessageButton()
          .setCustomId("=")
          .setLabel("=")
          .setStyle("SUCCESS"),
      );
    const row3 = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
          .setCustomId("*")
          .setLabel("×")
          .setStyle("SECONDARY"),
        new Discord.MessageButton()
          .setCustomId("4")
          .setLabel("4")
          .setStyle("SECONDARY"),
        new Discord.MessageButton()
          .setCustomId("5")
          .setLabel("5")
          .setStyle("SECONDARY"),
        new Discord.MessageButton()
          .setCustomId("6")
          .setLabel("6")
          .setStyle("SECONDARY"),
        new Discord.MessageButton()
          .setCustomId("erase")
          .setLabel("⌫")
          .setStyle("DANGER"),
      );
    const row4 = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
          .setCustomId("/")
          .setLabel("/")
          .setStyle("SECONDARY"),
        new Discord.MessageButton()
          .setCustomId("1")
          .setLabel("1")
          .setStyle("SECONDARY"),
        new Discord.MessageButton()
          .setCustomId("2")
          .setLabel("2")
          .setStyle("SECONDARY"),
        new Discord.MessageButton()
          .setCustomId("3")
          .setLabel("3")
          .setStyle("SECONDARY"),
        new Discord.MessageButton()
          .setCustomId("stop")
          .setLabel("END")
          .setStyle("DANGER"),
      );
    const row5 = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
          .setCustomId("^")
          .setLabel("^")
          .setStyle("SECONDARY"),
        new Discord.MessageButton()
          .setCustomId("(")
          .setLabel("(")
          .setStyle("SECONDARY"),
        new Discord.MessageButton()
          .setCustomId("0")
          .setLabel("0")
          .setStyle("SECONDARY"),
        new Discord.MessageButton()
          .setCustomId(")")
          .setLabel(")")
          .setStyle("SECONDARY"),
        new Discord.MessageButton()
          .setCustomId(".")
          .setLabel(".")
          .setStyle("SECONDARY"),
      );

    let show = "```00.00```";
    let calculate = "";


    const sent = await message.reply({
      content: content,
      components: [row1, row2, row3, row4, row5],
      reply: { messageReference: message.Id },
    });

    const filter = i => i.user.id === message.author.id && i.isButton();

    const collector = message.channel.createMessageComponentCollector({ filter, time: 90000 });

    collector.on("collect", async (i) => {
      if (i.customId === "+" || i.customId === "e" || i.customId === "pi" || i.customId === "log" || i.customId === "-" || i.customId === "7" || i.customId === "8" || i.customId === "9" || i.customId === "*" || i.customId === "4" || i.customId === "5" || i.customId === "6" || i.customId === "/" || i.customId === "1" || i.customId === "2" || i.customId === "3" || i.customId === "^" || i.customId === "(" || i.customId === "." || i.customId === "0" || i.customId === ")") {
        if (show === "```00.00```" || show === "```Expression Error :- 00.00```") {
          show = (i.customId === "pi") ? "π" : i.customId;
        } else show = (i.customId === "pi") ? show + "π" : show + i.customId;
        calculate = calculate + i.customId;
        await i.update({
          content: "```" + show + "```",
          ephemeral: true,
          components: [row1, row2, row3, row4, row5],
        })
      } else if (i.customId === "AC") {
        show = "```00.00```";
        calculate = "";
        await i.update({
          content: show,
          ephemeral: true,
          components: [row1, row2, row3, row4, row5],
        })
      } else if (i.customId === "=") {
        try {
          show = await solve.eval(calculate);
          calculate = show;
          await i.update({
            content: "```" + show + "```",
            ephemeral: true,
            components: [row1, row2, row3, row4, row5],
          })
        } catch (e) {
          show = "```Expression Error :- 00.00```";
          calculate = "";
          await i.update({
            content: show,
            ephemeral: true,
            components: [row1, row2, row3, row4, row5],
          })
        }

      } else if (i.customId === "erase") {
        if (show === "```00.00```" || show === "```Expression Error :- 00.00```") {
          show = "00.00";
        } else show = String(show).slice(0, show.length - 1);
        calculate = String(calculate).slice(0, calculate.length - 1);
        await i.update({
          content: "```" + show + "```",
          components: [row1, row2, row3, row4, row5],
          ephemeral: true,
        })
      } else if (i.customId === "stop") {
        collector.stop();
      }
    })

    collector.on("end", async () => {
      sent.delete();
      message.delete();
    })


  }//execute
}//module.export