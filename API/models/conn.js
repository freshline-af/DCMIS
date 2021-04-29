const mongoose = require('mongoose');
const connected = mongoose.connect("mongodb://localhost/dentistry", { useNewUrlParser: true });

mongoose.connection.on("error", err => {
    console.log("Database connection failed.", err);
});

module.exports = connected;