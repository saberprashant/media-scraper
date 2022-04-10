const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");


// db.sequelize.sync();

// for development only
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});


const app = express();
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Media Scraper App." });
});``
require('./routes/fetchMedia.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

