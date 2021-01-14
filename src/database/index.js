const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://test:eZZJ8wV0DcoPs42o@cluster0.1fssd.mongodb.net/Raw?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, data) => {
    if (err) {
      console.log("Mongodb connection problem");
    } else {
      console.log("mongodb connected!! :))");
    }
  }
);
