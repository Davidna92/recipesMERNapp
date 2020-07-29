const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  recipeTitle: {
    type: String,
    required: true,
    maxlength: 255,
  },
  recipeDescription: {
    type: String,
    required: true,
    maxlength: 9999,
  },
  recipeImg: {
    type: String,
    minlength: 11,
    maxlength: 1024,
  },
  recipeTime: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 500,
  },
  recipeIngredient: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

function validateRecipe(recipe) {
  const schema = Joi.object({
    recipeTitle: Joi.string().min(2).max(255).required(),
    recipeDescription: Joi.string().min(2).max(9999).required(),
    recipeImg: Joi.string().min(11).max(1024),
    recipeTime: Joi.string().min(1).max(500),
    recipeIngredient: Joi.string(),
  });
  return schema.validate(recipe);
}

exports.Recipe = Recipe;
exports.validateRecipe = validateRecipe;
