const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model");

router.post("/register", async (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      const token = generateToken(saved);
      res.status(201).json({ user: saved, token });
    })
    .catch(error => {
      if (error.errno == 19 || error.message.code == "23505") {
        res.status(400).json({ message: "username already in database" });
      } else {
        res.status(500).json({ message: error });
      }
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}`,
          token
        });
        console.log(res.message, "hello");
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "error" });
    });
});

function generateToken(user) {
  const payload = {
    sub: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;
