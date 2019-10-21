const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware");

router.get("/", restricted, (req, res) => {
  console.log(req.decodedToken);
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.get("/profile/:username", restricted, (req, res) => {
  const username = req.params.username;

  Users.findBy({ username })
    .first()
    .then(user => {
      res.json(user);
    })
    .catch(err => res.send(err));
});

router.get("/profile", restricted, (req, res) => {
  const username = req.decodedToken.username;
  Users.findBy({ username })
    .first()
    .then(user => {
      res.json(user);
    })
    .catch(err => res.send(err));
});

// router.put("/profile", restricted, (req, res) => {
//   const id = req.decodedToken.sub;
//   const changes = req.body;

//   Users.findById(id)
//     .then(user => {
//       if (user) {
//         Users.update(id, changes).then(updatedUser => {
//           res.json(updatedUser);
//         });
//       } else {
//         res.status(404).json({ message: "Could not locate user" });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ message: "failed to update user" });
//     });
// });
module.exports = router;
