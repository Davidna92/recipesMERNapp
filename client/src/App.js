import React, { Component } from "react";
import "./css/App.css";
import Header from "./components/header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import About from "./components/about";
import Footer from "./components/footer";
import Home from "./components/home";
import Register from "./components/register";
import ProtectedRoute from "./common/protected-route.jsx";
import CreateRecipe from "./components/createRecipe";
import RecipePage from "./components/recipe-page";
import MyRecipes from "./components/my-recipes";
import FavRecipes from './components/fav-recipes.jsx'
import EditRecipe from './components/edit-recipe.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/login";
import Logout from "./components/logout";
import userService from "./services/userService";

class App extends Component {
  state = {
  };

  async componentDidMount() {
    const user = await userService.getThisUser();
    this.setState({ user });
    
  }



  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <div className="container-fluid recipeImg" style={{
          backgroundColor: "rgb(211, 230, 207)"
        }}>
          <header>
            <Header user={user}  />
          </header>
          <main style={{ minHeight: "900px" }}>
            <Switch>
            <ProtectedRoute path="/fav-recipes" component={FavRecipes}/>
            <ProtectedRoute path="/my-recipes/edit/:id" component={EditRecipe}/>
              <ProtectedRoute path="/create-recipe" component={CreateRecipe} />
              <ProtectedRoute path="/my-recipes" component={MyRecipes} />
              <ProtectedRoute path="/" user={user} exact component={Home} />
              <Route path="/about" component={About} />
              <Route path="/user/register" component={Register} />
              <Route path="/user/login" component={Login} />
              <Route path="/user/logout" component={Logout} />
              <Route path="/recipes/:id" component={RecipePage} />
            </Switch>
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
