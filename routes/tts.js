import express from "express";
import fetch from "node-fetch";
import User from "../models/User.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/generate", auth, async (req,res)=>{
  const { text, voice } = req.body;

  if(!text || text.length > 3000)
    return res.status(400).json({ error:"Max 3000 characters" });

  const user = await User.findById(req.userId);
  if(user.characters < text.length)
    return res.status(403).json({ error:"Not enough characters" });

  const response = await fetch("https://api.deapi.ai/tts", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.DEAPI_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text,
      voice
    })
  });

  const data = await response.json();

  user.characters -= text.length;
  await user.save();

  res.json({
    audio: data.audio_url,
    charactersLeft: user.characters
  });
});

export default router;
