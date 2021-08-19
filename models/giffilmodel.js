const mongoose = require('mongoose');

const format = {
  guildid: String,
  filter: String,
};

module.exports = mongoose.model('gifildb', format);