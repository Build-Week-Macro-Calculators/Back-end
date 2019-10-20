const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware");

router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.get("/profile", restricted, (req, res) => {
  const username = req.decodedToken.username;

  Users.findBy({ username })
    .first()
    .then(user => {
      res.json(user);
    });
});
module.exports = router;
