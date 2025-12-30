import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Signup / Login (simple)
router.post("/login", async (req,res)=>{
  const { email } = req.body;
  let user = await User.findOne({ email });

  if(!user){
    user = await User.create({ email });
  }

  const token = jwt.sign(
    { id:user._id },
    process.env.JWT_SECRET,
    { expiresIn:"7d" }
  );

  res.json({
    token,
    characters: user.characters
  });
});

export default router;
