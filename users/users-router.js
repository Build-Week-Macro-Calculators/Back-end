const router = require("express").Router();
const profile = require("./profile/profile-router");
const moment = require("moment");

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware");

router.get("/", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(err => res.status(500).json({ message: err }));
});

router.get("/findAllWeights", (req, res) => {
  Users.findAllWeights()
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(err => res.status(500).json({ message: err }));
});

router.use("/profile", profile);

module.exports = router;
