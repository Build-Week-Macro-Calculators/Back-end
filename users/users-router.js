const router = require("express").Router();
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

router.get("/profile/search/:username", restricted, (req, res) => {
  const username = req.params.username;

  Users.findBy({ username })
    .first()
    .then(user => {
      res.status(200).json({ user });
    })
    .catch(err => res.status(500).json({ message: err }));
});

router.get("/profile", restricted, (req, res) => {
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

router.put("/profile", restricted, (req, res) => {
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

router.put("/profile/editWeight", restricted, (req, res) => {
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

router.delete("/profile", restricted, (req, res) => {
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

router.get("/profile/findweight", restricted, (req, res) => {
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

router.get("/findAllWeights", (req, res) => {
  Users.findAllWeights()
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(err => res.status(500).json({ message: err }));
});

module.exports = router;
