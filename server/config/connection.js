const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOURI, {
  ssl: true
});

module.exports = mongoose.connection;