const mongoose = require('mongoose');

const format = {
  guildid: String,
  emoji: String,
  userid: String,
};

module.exports = mongoose.model('autoreact', format);