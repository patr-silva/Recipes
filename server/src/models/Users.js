import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  savedRecipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "recipes",
    },
  ],
});

export const User = mongoose.model("User", userSchema);
