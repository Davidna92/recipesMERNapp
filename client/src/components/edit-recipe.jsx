import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import recipeService from "../services/recipeService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

class EditRecipe extends Form {
  state = {
    data: {
      _id: "",
      recipeTitle: "",
      recipeDescription: "",
      recipeImg: "",
      recipeTime: "",
      recipeIngredient: "",
    },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    recipeTitle: Joi.string()
      .min(2)
      .max(255)
      .required()
      .error(() => {
        return {
          message: "חייב לתת שם למתכון",
        };
      }),
    recipeDescription: Joi.string().min(2).max(9999).required(),
    recipeTime: Joi.string()
      .min(1)
      .max(500)
      .error(() => {
        return {
          message: "חייב לציין זמן הכנה",
        };
      }),
    recipeImg: Joi.string().min(11).max(1024).allow(""),
    recipeIngredient: Joi.string(),
  };

  async componentDidMount() {
    const recipeId = this.props.match.params.id;
    const { data } = await recipeService.getRecipe(recipeId);
    this.setState({ data: this.mapToView(data) });
  }

  doSubmit = async () => {
    const data = { ...this.state.data };
    await recipeService.editRecipe(data);
    toast.success("המתכון נשמר");
    this.props.history.replace("/my-recipes");
  };

  mapToView(recipe) {
    return {
      _id: recipe._id,
      recipeTitle: recipe.recipeTitle,
      recipeDescription: recipe.recipeDescription,
      recipeTime: recipe.recipeTime,
      recipeImg: recipe.recipeImg,
      recipeIngredient: recipe.recipeIngredient,
    };
  }

  render() {
    return (
      <div className="container text-center box ">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1>עריכת מתכון</h1>
            <form
              onSubmit={this.handleSubmit}
              action=""
              autoComplete="off"
              method="POST"
            >
              {this.renderInput("recipeTitle", "שם המתכון")}
              {this.renderTextArea("recipeIngredient", "מצרכים")}
              {this.renderTextArea("recipeDescription", "הוראות הכנה")}
              {this.renderInput("recipeTime", "זמן הכנה בדקות", "number")}
              {this.renderInput("recipeImg", "קישור לתמונה")}
              {this.renderButton("שמור")}
              <Button className="ml-2">
                <Link
                  to="/my-recipes"
                  style={{ textDecoration: "none", color: "green" }}
                >
                  Cancel
                </Link>
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditRecipe;
