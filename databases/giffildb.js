const mongoose = require("mongoose");

module.exports = async () => {
  await mongoose.createConnection(process.env["giffildb"], {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }).then(console.log("Connected to \'giffil\' database."));
};