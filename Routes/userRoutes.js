const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const verifyEmail = await userModel.findOne({ email });
    if (verifyEmail) {
      res.send("User already exists");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new userModel({ name, email, password: hashedPassword });
      await user.save();
      res.send("User created successfully");
    }
  } catch (error) {
    res.send(error);
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign({ userID: user._id }, "CaptainLevi", {
          expiresIn: "7d",
        });
        res.send({ token });
      } else {
        res.send("Password is incorrect");
      }
    } else {
      res.send("User does not exist please Register");
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = { userRouter };
