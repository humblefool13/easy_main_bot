const fs = require('fs');
const ascii = require('ascii-table');
let table = new ascii('Events');
table.setHeading('Events', 'Load status');
module.exports = async (client) => {
  let theevents;
  fs.readdirSync('./events/').forEach((file) => {
    theevents = fs.readdirSync(`./events/`).filter((file) => file.endsWith('.js'));
    fs.readdir('./events/', (err, files) => {
      if (err) return console.error(err);
      const event = require(`../events/${file}`);
      if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
      } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
      }
    });
  });
  for (let i = 0; i < theevents.length; i++) {
    try {
      table.addRow(theevents[i], '✅');
    } catch (error) {
      console.error(error.stack);
    }
  }
  console.log(table.toString());
  console.log('Logging into the BOT...');
};