const mongoose = require("mongoose");

module.exports = async () => {
  await mongoose.connect(process.env["rolepermsdb"], {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }).then(console.log("Connected to \'roleperms\' database."));
};