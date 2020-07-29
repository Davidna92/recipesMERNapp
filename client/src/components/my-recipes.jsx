import React, { Component } from "react";
import recipeService from "../services/recipeService";
import Recipe from "./recipe";
import Spinner from "react-bootstrap/Spinner";

class MyRecipes extends Component {
  state = {
    recipes: [],
    isLoading: true,
  };

  async componentDidMount() {
    const { data } = await recipeService.getMyRecipes();
    if (data.length > 0) this.setState({ recipes: data, isLoading: false });
  }

  handleDelete = async (recipeId) => {
    let { recipes } = this.state;
    recipes = recipes.filter((recipe) => recipe._id !== recipeId);
    this.setState({ recipes });
    await recipeService.deleteRecipe(recipeId);
  };

  render() {
    const { recipes, isLoading } = this.state;
    return (
      <div
        className="container-fluid text-center recipeImg"
        style={{ minHeight: "900px" }}
      >
        <div className="row">
          <div className="col-lg-12 mt-3">
            <h1 className="title">המתכונים שלי</h1>
            {isLoading ? (
              <Spinner animation="border" variant="success" />
            ) : null}
          </div>
        </div>
        <div className="row">
          {recipes.length > 0 &&
            recipes.map((recipe) => (
              <Recipe
                key={recipe._id}
                recipe={recipe}
                handleDelete={this.handleDelete}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default MyRecipes;
