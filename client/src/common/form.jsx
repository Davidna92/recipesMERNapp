import React, { Component } from "react";
import Joi from "joi-browser";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  direction: "rtl",
});

class Form extends Component {
  state = {
    data: {},
    error: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return false;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return true;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage.replace(/"/g, "");
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <div dir="rtl">
          <TextField
            className="input"
            onChange={this.handleChange}
            placeholder={label}
            variant="outlined"
            type={type}
            name={name}
            style={{ marginTop: 10, width: "100%" }}
            value={data[name]}
            helperText={errors[name]}
            error={errors[name] ? true : false}
          />
        </div>
      </ThemeProvider>
    );
  }

  renderTextArea(name, label) {
    const { data } = this.state;
    return (
      <div>
        <textarea
          className="col-lg-12 mt-3 textarea"
          onChange={this.handleChange}
          placeholder={label}
          name={name}
          value={data[name]}
          wrap="hard"
        />
      </div>
    );
  }

  renderButton(label) {
    return (
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        disabled={this.validate()}
        classnames="register-btn"
        style={{ marginTop: 10, width: "100%" }}
      >
        {label}
      </Button>
    );
  }
}

export default Form;
