const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


// set up express
const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

// set up mongoose
mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);

// set up routes
app.use("/users", require("./routes/users"));
app.use("/customers", require("./routes/customers"));
app.use("/sanitize", require("./arduino/Sanitizer"));

app.get("/", (req, res) => {
  res.send("Welcome to CovidPro");
});

/*
// delete item in mongodb
app.delete("/delete", (req, res) => {
  const { id } = "61a107954308a6c28b76d16c";
  const query = { _id: id };
  mongoose.model("customers").deleteOne(query, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
 */
