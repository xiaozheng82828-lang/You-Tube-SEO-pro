import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type:String, unique:true },
  password: String,
  characters: { type:Number, default:16000 },
  plan: { type:String, default:"free" }
});

export default mongoose.model("User", userSchema);
