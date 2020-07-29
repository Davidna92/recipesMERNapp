const express = require("express");
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const { Recipe } = require("../models/recipe");
const _ = require("lodash");
const e = require("express");
const router = express.Router();

const getRecipes = async (recipesArray) => {
  const recipes = await Recipe.findOne({ _id: recipesArray });
  return recipes;
};

router.put("/recipes/:id", auth, async (req, res) => {
  const recipe = await getRecipes(req.params.id);
  let user = await User.findById(req.user._id);

  let check = user.recipes.find(
    //check if there is same recipe in the array
    (item) => item._id.toString() === recipe._id.toString()
  );
  if (check) {
    res.status(400); // ?? cant res.send
  } else {
    user.recipes.push(recipe);
  }
  await user.save();
  res.send(user);
});

router.put("/recipes/remove/:id", auth, async (req, res) => {
  const recipe = await getRecipes(req.params.id);
  let user = await User.findById(req.user._id);

  let check = user.recipes.findIndex(
    (item) => item._id.toString() === recipe._id.toString()
  );
  user.recipes.splice(check, 1);
  await user.save();
  res.send(user);
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password", "recipes"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ["_id", "name", "email"]));
});

router.get("/:id", auth, async (req, res) => {
  const user = await User.findOne({
    _id: req.params.id,
  });
  if (!user) return res.status(404).send("user not found");
  res.send(user);
});

module.exports = router;
