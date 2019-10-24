const restricted = require("../../auth/restricted-middleware");
const moment = require("moment");
const profile = require("express").Router();
const Users = require("../users-model");

profile.get("/", restricted, (req, res) => {
  const username = req.decodedToken.username;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "user not found" });
      }
    })
    .catch(err => res.status(500).json({ message: err }));
});

profile.get("/weight", restricted, (req, res) => {
  const id = req.decodedToken.sub;

  Users.findUserWeights(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "user not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error processing request" });
    });
});

profile.get("/search/:username", restricted, (req, res) => {
  const username = req.params.username;

  Users.findBy({ username })
    .first()
    .then(user => {
      res.status(200).json({ user });
    })
    .catch(err => res.status(500).json({ message: err }));
});

profile.put("/", restricted, (req, res) => {
  const id = req.decodedToken.sub;
  const changes = req.body;

  Users.findById(id)
    .then(user => {
      if (user) {
        Users.update(id, changes).then(updatedUser => {
          res.json(updatedUser);
        });
      } else {
        res.status(404).json({ message: "Could not locate user" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "failed to update user" });
    });
});

profile.put("/editWeight", restricted, (req, res) => {
  const id = req.decodedToken.sub;
  const changes = req.body;

  Users.findById(id)
    .then(async user => {
      if (user) {
        const update = await Users.update(id, changes);
        const date = moment().format("LLL");
        const userData = {
          user_id: id,
          weight: changes.weight,
          date: date
        };
        const newWeight = await Users.addWeight(userData);
        res.status(200).json(userData);
      } else {
        res.status(404).json({ message: "Could not locate user" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "failed to process request" });
    });
});

profile.delete("/", restricted, (req, res) => {
  const id = req.decodedToken.sub;

  Users.findById(id)
    .then(user => {
      if (user) {
        Users.remove(id).then(
          res.status(200).json({ message: "deleted user" })
        );
      } else {
        res.status(404).json({ message: "could not locate user" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "failed to process request" });
    });
});

module.exports = profile;
