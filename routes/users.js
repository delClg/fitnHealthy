const express = require("express");
const router = express.Router();
// using mongoose
const User = require("../models/user");
// const db = require("../models/db");
// const dbName = "Fit_Users";
// const collectionName = "User_Details";

// get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error });
  }
  //   db.initialize(
  //     dbName,
  //     collectionName,
  //     function (dbCollection) {
  //       // successCallback
  //       // get all items
  //       dbCollection.find().toArray(function (err, result) {
  //         if (err) throw err;
  //         res.json(result);
  //       });
  //       // << db CRUD routes >>
  //     },
  //     function (err) {
  //       // failureCallback
  //       throw err;
  //     }
  //   );
});

// getting one
router.get("/:id", getUser, (req, res) => {
  res.send(res.user);
});

// creating one
router.post("/", async (req, res) => {
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    pwd: req.body.pwd,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// updating one
router.patch("/:id", getUser, async (req, res) => {
  if (req.body.userName != null) {
    res.user.userName = req.body.userName;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.pwd != null) {
    res.user.pwd = req.body.pwd;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// deleting one
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "Deleted Subscriber" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

module.exports = router;
