import express from "express";
import mongoose from "mongoose";
import { verifyToken } from "./user.js";

import { Recipe } from "../models/Recipes.js";
import { User } from "../models/Users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await Recipe.find({});
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

router.post("/", verifyToken, async (req, res) => {
  const recipe = new Recipe({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    imageUrl: req.body.imageUrl,
    cookingTime: req.body.cookingTime,
    userOwner: req.body.userOwner,
  });
  try {
    const response = await recipe.save();
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

router.put("/", verifyToken, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.body.recipeId);
    const user = await User.findById(req.body.userId);

    user.savedRecipes.push(recipe);
    await user.save();
    res.json({ savedRecipes: user.savedRecipes });
  } catch (error) {
    res.json(error);
  }
});

router.get("/saved-recipes/ids/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json({ savedRecipes: user?.savedRecipes });
  } catch (error) {
    res.json(error);
  }
});

router.get("/saved-recipes/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const savedRecipes = await Recipe.find({
      _id: { $in: user.savedRecipes },
    });
    res.json({ savedRecipes });
  } catch (error) {
    res.json(error);
  }
});

router.get("/details/:recipeId", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    res.json({ recipe });
  } catch (error) {
    res.json(error);
  }
});

export { router as recipesRouter };
