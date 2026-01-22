import express from "express";
import User from "../models/user.js"; 
import bcrypt from "bcrypt";

const router = express.Router(); 

router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs");
});

router.get("/sign-in", (req, res) => {
  res.render("auth/sign-in.ejs");
});

router.get("/sign-out", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

router.post("/sign-in", async (req, res) => {
  const userInDB = await User.findOne({ username: req.body.username }).select('+password');
  if (!userInDB) {
    return res.send(
      `A user with username ${req.body.username} does not exist.`
    );
  }

  const isValidPassword = bcrypt.compareSync(
    req.body.password,
    userInDB.password
  );
  if (!isValidPassword) {
    return res.send(`Password Incorrect`);
  }

  req.session.user = {
    username: userInDB.username,
    _id: userInDB._id,
  };

  req.session.save(() => {
    res.redirect("/");
  });
});

router.post("/sign-up", async (req, res) => {
  const userInDB = await User.findOne({ username: req.body.username });
  if (userInDB) {
    return res.send(`A user with username ${req.body.username} already exist.`);
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.send(`Your password and password confirm must match!`);
  }

  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hashedPassword;

  const username = req.body.username.charAt(0).toUpperCase() + req.body.username.slice(1);
  
  const newUser = await User.create({
    username: username,
    password: hashedPassword
  });

  req.session.user = {
    username: newUser.username,
    _id: newUser._id,
  };

  req.session.message = `Welcome to What2Wear ${newUser.username}`

  req.session.save(() => {
    res.redirect("/wardrobe");
  });
});

export default router;