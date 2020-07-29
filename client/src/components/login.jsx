import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import userService from "../services/userService";

class Login extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };
  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email")
      .error(() => {
        return {
          message: "אימייל חייב להיות חוקי",
        };
      }),
    password: Joi.string()
      .required()
      .min(6)
      .label("Password")
      .error(() => {
        return {
          message: "סיסמא חייבת להיות מינימום 6 תוים",
        };
      }),
  };

  doSubmit = async () => {
    const { email, password } = this.state.data;

    try {
      await userService.login(email, password);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ errors: { email: ex.response.data } });
      }
    }
  };

  render() {
    if (userService.getThisUser()) return <Redirect to="/" />;
    return (
      <Fade clear>
        <div className="container  text-center bg login-bg">
          <div className="row">
            <Zoom>
              <div className="col-lg-4 authContainer p-3">
                <h1>התחברות</h1>
                <p>
                  משתמש חדש?{" "}
                  <NavLink
                    to="/user/register"
                    style={{ textDecoration: "none" }}
                  >
                    לחץ כאן
                  </NavLink>
                </p>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                  {this.renderInput("email", "אימייל", "email")}
                  {this.renderInput("password", "סיסמא", "password")}
                  {this.renderButton("אישור")}
                </form>
              </div>
            </Zoom>
          </div>
        </div>
      </Fade>
    );
  }
}

export default Login;
