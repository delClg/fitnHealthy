const express = require("express");
const router = express.Router();
// using mongoose
const User = require("../models/user");
// const db = require("../models/db");
// const dbName = "Fit_Users";
// const collectionName = "User_Details";

// Get one by email

router.get("/:eml", async (req, res) => {
  try {
    const query = await User.findOne({ email: `${req.params.eml}` });
    res.json(query);
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

module.exports = router;
