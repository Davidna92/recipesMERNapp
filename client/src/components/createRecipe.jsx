import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import recipeService from "../services/recipeService";
import { toast } from "react-toastify";

class CreateRecipe extends Form {
  state = {
    data: {
      recipeTitle: "",
      recipeDescription: "",
      recipeImg: "",
      recipeTime: "",
      recipeIngredient: "",
    },
    errors: {},
  };

  schema = {
    recipeTitle: Joi.string().min(2).max(255).required().error(() => {
      return {
        message: "חייב לתת שם למתכון",
      };
    }),
    recipeDescription: Joi.string().min(2).max(9999).required(),
    recipeTime: Joi.string().min(1).max(500).error(() => {
      return {
        message: "חייב לציין זמן הכנה",
      };
    }),
    recipeImg: Joi.string().min(11).max(1024).allow(""),
    recipeIngredient: Joi.string(),
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    await recipeService.createRecipe(data);
    toast("המתכון פורסם בהצלחה!");
    this.props.history.replace("/my-recipes");
  };

  render() {
    return (
      <div className="container text-center box ">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1>כתיבת מתכון</h1>
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
              {this.renderButton("הוסף מתכון")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateRecipe;
