import React, { Component } from "react";
import RecipeFeed from "./recipe-feed";

class Home extends Component {
  state = {};
  render() {
    return (
      <div className="container-fluid text-center recipeImg">
        <div className="row">
          <div className="col-12 mt-3">
            <h1 className="title">המתכוניה</h1>
          </div>
        </div>
        <RecipeFeed />
      </div>
    );
  }
}

export default Home;
