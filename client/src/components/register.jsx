import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import {Redirect} from 'react-router-dom';
import userService from '../services/userService';
import { toast } from "react-toastify";
import http from "../services/httpService";
import { myUrl } from "../config.json";

class Register extends Form {
  state = {
    data: {
      email: "",
      password: "",
      name: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
      .error(() => {
        return {
          message: "אימייל חייב להיות חוקי",
        };
      }),
    name: Joi.string()
      .required()
      .min(2)
      .error(() => {
        return {
          message: "שם חייב להיות בעל 2 תוים לפחות",
        };
      }),
    password: Joi.string()
      .required()
      .min(6)
      .error(() => {
        return {
          message: "סיסמא חייבת להיות מינימום 6 תוים",
        };
      }),
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    console.log(data);
    try {
      await http.post(`${myUrl}/users`, data);
      toast.success("New Account was Created");
      this.props.history.replace("/user/login");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        this.setState({ errors: { email: "Email is already taken" } });
      }
    }
  };

  render() {
    if (userService.getThisUser()) return <Redirect to="/" />;

    return (
      <Fade clear>
        <div className="container  text-center register-bg bg">
          <div className="row">
            <Zoom>
              <div className="col-lg-4 p-3">
                <h1>הרשמה לאתר</h1>
                <p>הרשמו, שתפו וגלו מתכונים חדשים!</p>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                  {this.renderInput("email", "אימייל", "email")}
                  {this.renderInput("password", "סיסמא", "password")}
                  {this.renderInput("name", "שם")}
                  {this.renderButton("הרשם")}
                </form>
              </div>
            </Zoom>
    
          </div>
        </div>
      </Fade>
    );
  }
}

export default Register;
