const express = require("express");
const _ = require("lodash");
const { Recipe } = require("../models/recipe");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/all", auth, async (req, res) => {
  const recipes = await Recipe.find({}).sort({createdAt: -1});
  if (!recipes) return res.status(404).send("There is no recipes");
  res.send(recipes);
});

router.get("/myrecipes", auth, async (req, res) => {
  const recipes = await Recipe.find({ user_id: req.user._id }).sort({createdAt: -1});
  if (!recipes) return res.status(404).send("There is no recipes");
  res.send(recipes);
});

router.get("/:id", auth, async (req, res) => {
  const recipe = await Recipe.findOne({ _id: req.params.id });
  if (!recipe)
    return res.status(404).send("The recipe with that ID was not found");
  res.send(recipe);
});

router.delete("/:id", auth, async (req, res) => {
  const recipe = await Recipe.findOneAndRemove({
    _id: req.params.id,
    user_id: req.user._id,
  });
  if (!recipe)
    return res.status(404).send("The recipe with the given ID was not found.");
  res.send(recipe);
});

router.put("/:id", auth, async (req, res) => {
  let recipe = await Recipe.findOneAndUpdate(
    {
      _id: req.params.id,
      user_id: req.user._id,
    },
    req.body
  );
  if (!recipe)
    return res.status(404).send("The recipe with given ID was not found.");
  recipe = await Recipe.findOne({ _id: req.params.id, user_id: req.user._id });
  res.send(recipe);
});

router.post("/", auth, async (req, res) => {
  let recipe = new Recipe({
    recipeTitle: req.body.recipeTitle,
    recipeIngredient: req.body.recipeIngredient,
    recipeDescription: req.body.recipeDescription,
    recipeTime: req.body.recipeTime,
    recipeImg: req.body.recipeImg
      ? req.body.recipeImg
      : "https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_960_720.png",
    user_id: req.user._id,
  });
  post = await recipe.save();
  res.send(post);
});

module.exports = router;
