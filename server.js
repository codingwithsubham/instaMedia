const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const app = express();
const bodyParser = require('body-parser');

// Connect Database
connectDB();
// Init Middleware
app.use(express.json({ extended: false }));
//defining body-parser
app.use(bodyParser.urlencoded({ extended: true }));
// Defining pictures folder static
app.use(express.static("uploads"));
// Define Routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/pg", require("./routes/api/pg"));
app.use("/api/media", require("./routes/api/media"));
app.use("/api/content", require("./routes/api/content"));

//Set static folder
app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
