const { readdirSync } = require("fs");
require('../config.json');
const ascii = require("ascii-table");
let table = new ascii("Interactions");
table.setHeading("Interaction", "Directory", "Load status");
console.log("Loading Interactions!");
module.exports = (client) => {
  readdirSync("./interactions/").forEach(dir => {
    const interactions = readdirSync(`./interactions/${dir}/`).filter(file => file.endsWith(".js"));
    for (let file of interactions) {
      let pull = require(`../interactions/${dir}/${file}`);
      if (pull.data) {
        table.addRow(file, dir, '✅');
        client.interactions.set(pull.name, pull);
      } else {
        table.addRow(file, dir, `❗ error -> missing a data`);
        continue;
      }
    }
  });
  console.log(table.toString());

}