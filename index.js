const express = require("express");
const cors = require("cors");
const app = express();
const videos = require("./routes/videos");

require("dotenv").config();

const PORT = process.env.PORT;

//Middleware
app.use ("/img", express.static ("./public/img"))


app.use(cors());
app.use(express.json());

app.use("/videos", videos);

app.listen(PORT, () => {
  console.log(`Port is open on: ${PORT} `);
});