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

router.post("/sign-up", async (req, res) => {
  const username = req.body.username.charAt(0).toUpperCase() + req.body.username.slice(1);
  const userInDB = await User.findOne({ username: username });
  if (userInDB) {
    return res.send(`A user with username ${req.body.username} already exist.`);
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.send(`Your password and password confirm must match!`);
  }

  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  
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

router.post('/sign-in', async(req, res) => {
  try {
    const { username, password } = req.body;
    
    // Capitalize username to match sign-up format
    const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);
    
    // Find user and include password field
    const user = await User.findOne({ username: capitalizedUsername }).select('+password');
    
    // Check if user exists
    if (!user) {
      req.session.message = "Invalid username or password";
      return req.session.save(() => res.redirect("/auth/sign-in"));
    }
    
    // Compare passwords
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    
    if (!isPasswordValid) {
      req.session.message = "Invalid username or password";
      return req.session.save(() => res.redirect("/auth/sign-in"));
    }
    
    // Set session user
    req.session.user = {
      username: user.username,
      _id: user._id,
    };
    
    
    req.session.save(() => {
      res.redirect("/wardrobe");
    });
    
  } catch (error) {
    console.log(error);
    req.session.message = "Sign-in failed: " + error.message;
    req.session.save(() => res.redirect("/auth/sign-in"));
  }
});

export default router;