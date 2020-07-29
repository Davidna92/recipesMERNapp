import React, { Component } from "react";
import userService from "../services/userService";
import Recipe from "./recipe";
import Spinner from "react-bootstrap/Spinner";

class FavRecipes extends Component {
  state = {
    recipes: [],
    isLoading: true,
  };

  async componentDidMount() {
    const user = await userService.getThisUser();
    const { data } = await userService.getUser(user._id);
    this.setState({ recipes: data.recipes, isLoading: false });
  }

  renderNoRecipes() {
    const { isLoading } = this.state;
    return (
      <div className="container" style={{ minHeight: "900px" }}>
        <div className="row">
          <div className="col-lg-12 text-center">
            {isLoading ? (
              <Spinner animation="border" variant="success" />
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { recipes } = this.state;
    return (
      <div
        className="container-fluid text-center recipeImg"
        style={{ minHeight: "900px" }}
      >
        <div className="row">
          <div className="col-12 mt-3">
            <h1 className="title">מתכונים שאהבתי</h1>
          </div>
        </div>
        <div className="row">
          {recipes.length > 0
            ? recipes.map((recipe) => (
                <Recipe key={recipe._id} recipe={recipe} />
              ))
            : this.renderNoRecipes()}
        </div>
      </div>
    );
  }
}

export default FavRecipes;
