import React, { Component } from "react";
import recipeService from "../services/recipeService";
import userService from "../services/userService";
import { Button } from "@material-ui/core";
import { toast } from "react-toastify";

class RecipePage extends Component {
  state = {
    data: {
      recipeTitle: "",
      recipeDescription: "",
      recipeTime: "",
      recipeImg: "",
      createdAt: "",
      user_id: "",
      recipeIngredient: "",
    },
    user: {},
  };

  async componentDidMount() {
    const recipeId = this.props.match.params.id;
    const { data } = await recipeService.getRecipe(recipeId);
    this.setState({ data: this.mapToView(data) });
    const userId = data.user_id;
    userService.getUser(userId).then((user) => {
      this.setState({ user: user.data });
    });
  }
  checkFav = () => {
    const { data, user } = this.state;
    let check = user.recipes.find((item) => item._id === data._id);
    if (check) return true;
  };

  mapToView(recipe) {
    return {
      _id: recipe._id,
      recipeTitle: recipe.recipeTitle,
      recipeDescription: recipe.recipeDescription,
      recipeTime: recipe.recipeTime,
      recipeImg: recipe.recipeImg,
      createdAt: recipe.createdAt,
      user_id: recipe.user_id,
      recipeIngredient: recipe.recipeIngredient,
    };
  }

  userToView(user) {
    return {
      _id: user.id,
      name: user.name,
    };
  }

  addToFav = (id) => {
    userService.addFavs(id);
    toast.success("נוסף למועדפים");
  };

  removeFav = (id) => {
    userService.removeFav(id);
    toast.error("מתכון הוסר מהמועדפים");
  };

  render() {
    const { data } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12  text-center mt-3 border-bottom ">
            <h1 className="title">{data.recipeTitle}</h1>
            <h6>כותב המתכון: {this.state.user.name}</h6>
            <h6>זמן ההכנה: {data.recipeTime} דקות</h6>

            <Button
              onClick={() => this.addToFav(data._id)}
              color="primary"
              className="btn m-2"
            >
              <i className="fas fa-heart" style={{ color: "red" }}></i>
            </Button>

            <Button
              onClick={() => this.removeFav(data._id)}
              color="primary"
              className="btn m-2"
            >
              <i className="far fa-frown" style={{ color: "black" }}></i>
            </Button>
          </div>
        </div>
        <div className="row box">
          <div
            className="col-lg-6 text-right"
            style={{ whiteSpace: "pre-wrap" }}
            >

            <h2>מצרכים</h2>
            {data.recipeIngredient}
          </div>
          <div className="col-lg-6 float-left p-2">
          <img
              src={data.recipeImg}
              alt={data.recipeTitle}
              style={{width: "100%", height: "360px"}}
            />
          </div>
        </div>
        <div className="row box">
          <div
            className="col-lg-8 mt-2 text-right float-right"
            style={{ whiteSpace: "pre-wrap" }}
          >
            <h2>הוראות הכנה</h2>
            {data.recipeDescription}
          </div>
          
        </div>
      </div>
    );
  }
}
export default RecipePage;
