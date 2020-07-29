import React, { Component } from "react";
import recipeService from "../services/recipeService";
import Recipe from "./recipe";
import { TextField } from "@material-ui/core";

class RecipeFeed extends Component {
  constructor() {
    super();
    this.recipesToFilter = this.state.recipes;
  }
  state = {
    recipes: [],
    isLoading: true,
  };

  async componentDidMount() {
    const { data } = await recipeService.getAllRecipes();
    this.recipesToFilter = data;
    if (data.length > 0) this.setState({ recipes: data, isLoading: false });
  }
  handleDelete = async (recipeId) => {
    let { recipes } = this.state;
    recipes = recipes.filter((recipe) => recipe._id !== recipeId);
    this.setState({ recipes });
    await recipeService.deleteRecipe(recipeId);
  };

  searchRecipes = (e) => {
    const { value } = e.target;
    const recipes = this.recipesToFilter.filter((recipe) => {
      return recipe.recipeTitle.toLowerCase().includes(value.toLowerCase());
    });
    this.setState({ recipes });
  };

  renderNoRecipes() {
    return (
      <div className="container" style={{minHeight: "900px"}}>
        <div className="row">
          <div className="col-lg-12 text-center">
            <h3>אין תוצאות לחיפוש</h3>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { recipes } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <TextField
              placeholder="חיפוש"
              className="input col-lg-6"
              onChange={this.searchRecipes}
            />
          </div>
        </div>
        <div className="row">

          {recipes.length > 0 ?
            recipes.map((recipe) => (
              <Recipe
                key={recipe._id}
                recipe={recipe}
                handleDelete={this.handleDelete}
              />
            )) : this.renderNoRecipes()}
        </div>
      </div>
    );
  }
}

export default RecipeFeed;
