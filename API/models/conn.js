const mongoose = require('mongoose');
<<<<<<< HEAD
const connected = mongoose.connect("mongodb://localhost/dentistry", { useNewUrlParser: true });
=======
const connected = mongoose.connect("mongodb://localhost/dentistry", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
>>>>>>> 5fb28ddbb769a63b0a87cfe7548b88bc43af508f

mongoose.connection.on("error", err => {
    console.log("Database connection failed.", err);
});

module.exports = connected;