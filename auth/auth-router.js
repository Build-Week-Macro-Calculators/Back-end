const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model");

router.post("/register", async (req, res) => {
  let user = req.body;
  const hash = await bcrypt.hashSync(user.password, 10);
  user.password = hash;

  await Users.add(user)
    .then(saved => {
      console.log("added");
      const token = generateToken(saved);
      res.status(201).json({ user: saved, token });
    })
    .catch(error => {
      res.status(500).json(error);
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
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user) {
  console.log(user.username);
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
