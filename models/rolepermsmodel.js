const mongoose = require('mongoose');

const format = {
  guildid: String,
  command: String,
  roleid: String,
};

module.exports = mongoose.model('roleperm', format);