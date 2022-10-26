const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

require("dotenv").config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const routeBook = require("./routes/routeBook");
const routeUser = require("./routes/routeUser");
const routeAuth = require("./routes/routeAuth");
const routePublisher = require("./routes/routePublisher");
const routeCategory = require("./routes/routeCategory");
const routeAuthFirebase = require("./routes/routeAuthFirebase");

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.mou1drt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("database connected...");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/book", routeBook);
app.use("/api/user", routeUser);
app.use("/api/user", routeAuth);
app.use("/api/pub", routePublisher);
app.use("/api/category", routeCategory);
app.use("/api/authFirebase", routeAuthFirebase);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Welcome to the wareHouseManagementSystem" });
});

app.listen(PORT, () => {
  console.log("Server is running on port.." + PORT);
});
