if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// mongodb+srv://delClg:<password>@cluster0.lh9gm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
if (process.env.DATABASE_URL != null) {
  mongoose.connect(process.env.DATABASE_URL);
  const db = mongoose.connection;

  db.on("error", (error) => console.error(error));
  db.once("open", () => console.log("connected to database"));
}

// localhost:5000

app.listen(process.env.PORT || 5000, () => {
  console.log("server started");
});

// express app configuration

app.use(express.json());
app.use(express.static("static"));
const usersRouter = require("./routes/users");
const userRouter = require("./routes/user");
app.use("/users", usersRouter);
app.use("/user", userRouter);
