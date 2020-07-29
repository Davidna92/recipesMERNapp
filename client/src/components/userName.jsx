import React, { Component } from "react";
import userService from "../services/userService";

class UserName extends Component {
  state = {};

  async componentDidMount() {
    const user =  this.props.user;
    const temp = await userService.getUser(user._id);
    const name = temp.data.name;
    this.setState({name});
  }
  

  render() {
    const {name} = this.state;
    return (
      <div className="text-center p-2">
        <h6>
          שלום <span>{name}</span>
        </h6>
      </div>
    );
  }
}

export default UserName;
