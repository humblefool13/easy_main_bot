require('./alive');
require('./databases/rolepermsdb')();
require('./databases/autoreactdb')();
require('./databases/giffildb')();
require('./config.json');


const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');


const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGES] });


client.commands = new Collection();
client.interactions = new Collection();
client.aliases = new Collection();

/*client.on('debug', (info) => {
    console.log(info);
});*/

require(`./handlers/command`)(client);
require('./handlers/events')(client);
require('./handlers/interactions')(client);

client.login(process.env['bot-token']);