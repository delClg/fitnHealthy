require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// mongodb+srv://delClg:<password>@cluster0.lh9gm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));

app.use(express.json());
app.use(express.static("./"));
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);
app.listen(3000, () => {
  console.log("server started");
});
