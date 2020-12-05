const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// Item Model
const User = require("../../models/User");

// @route POST api/users
// @desc Register new user
// @access Public
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  // validation simple
  if (!name || !email || !password) {
    res.status(400).json({ msg: "Please enter all fields" });
  }

  // Si tout est bon, on vérifie s'il n'y a pas déjà un compte avec cet email.
  User.findOne({ email }).then((user) => {
    if (user) return res.status("400").json({ msg: "User already exists" });

    const newUser = new User({
      name,
      email,
      password,
    });

    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          res.json({
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        });
      });
    });
  });
});

module.exports = router;
