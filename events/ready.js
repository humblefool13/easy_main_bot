const Discord = require('discord.js');
const { readdirSync } = require("fs");

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    let users = 0;
    client.guilds.cache.each((g) => {
      users = users + g.memberCount;
    });
    console.log(`Ready! Logged in as ${client.user.tag}`);
    console.log('In ' + client.guilds.cache.size + ' Servers .');
    console.log(`Have ${users} users .`);
    client.user.setActivity(`e;help`, { type: 'LISTENING' });
    console.log(client.guilds.cache.map(g => g.name + " = " + g.memberCount));
    await client.application?.fetch();
  },
};