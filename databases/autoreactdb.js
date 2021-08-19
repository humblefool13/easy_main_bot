const mongoose = require("mongoose");

module.exports = async () => {
  await mongoose.createConnection(process.env["autoreactdb"], {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }).then(console.log("Connected to \'autoreact\' database."));
};