const roleperms = require('../models/rolepermsmodel');
const autoreact = require('../models/autoreactmodel');
const giffil = require('../models/giffilmodel');
require("mongoose");

module.exports = {
  name: 'guildDelete',
  once: false,
  async execute(client, guild) {
    //autoreact
    await autoreact.deleteMany({
      guildid: guild.Id,
    }).catch((e) => console.log(e));

    //roleperms
    await roleperms.deleteMany({
      guildid: guild.Id,
    }).catch((e) => console.log(e));


    //gifffil
    await giffil.deleteMany({
      guildid: guild.Id,
    }).catch((e) => console.log(e));


  }
}