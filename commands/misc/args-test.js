module.exports = {
  name: 'argstest',
  aliases: ['at'],
  description: 'Testing args! initially made for dev processes but then decided to not remove :P',
  cooldown: 50,
  args: true,
  permissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
  usage: '`e;argstest <any arguments>`',
  guildOnly: true,
  run: async (client, message, args) => {
    if (args[0] === 'foo') {
      return message.channel.send('bar');
    }

    message.reply({
      content: `Arguments: ${args}\nArguments length: ${args.length}`
    });
  }
};