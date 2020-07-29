import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Zoom from "react-reveal/Zoom";
import userService from "../services/userService";
import moment from "moment";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";
import { swal } from "../config.json";

class Recipe extends Component {
  state = {
    isLoading: true,
  };

  showSwal(id) {
    Swal.fire(swal).then((result) => {
      if (result.value) {
        this.props.handleDelete(id);
        Swal.fire("!המתכון נמחק", "נמחק", "success");
      }
    });
  }

  async componentDidMount() {
    const user = await userService.getThisUser();
    this.setState({ user, isLoading: false });
  }

  root = {
    maxWidth: "100%",
  };
  media = {
    height: 260,
  };

  calcTime(timeToCalc) {
    return moment(timeToCalc).format("DD/MM/YYYY");
  }

  render() {
    const { user, isLoading } = this.state;
    const { recipe } = this.props;
    return (
      <div className="col-lg-4 col-md-6 col-xs-12 mt-3 justify-content-center ">
        <Zoom>
          <Card style={this.root}>
            <Link
              style={{ textDecoration: "none", color: "green" }}
              to={`/recipes/${recipe._id}`}
            >
              <CardActionArea>
                <CardMedia
                  style={this.media}
                  image={recipe.recipeImg}
                  title="recipe-img"
                  alt={`${recipe.recipeTitle}Img`}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {recipe.recipeTitle}
                  </Typography>
                  <Typography
                    className="pt-2"
                    color="textSecondary"
                    component="p"
                  >
                    זמן הכנה: {recipe.recipeTime} דקות
                  </Typography>
                  <div className="mt-5">
                    <Typography
                      className="border-top pt-2"
                      color="textSecondary"
                      component="p"
                    >
                      תאריך פרסום: {this.calcTime(recipe.createdAt)}
                    </Typography>
                  </div>
                </CardContent>
              </CardActionArea>
            </Link>
            {isLoading ? (
              <Spinner animation="border" variant="success" />
            ) : (
              <CardActions className="border-top">
                {user._id === recipe.user_id ? (
                  <React.Fragment>
                    <Link
                      title="edit recipe"
                      to={`/my-recipes/edit/${recipe._id}`}
                      style={{ textDecoration: "none", color: "green" }}
                    >
                      <i className="far fa-edit"></i>
                    </Link>{" "}
                    <button
                      title="Delete Recipe"
                      className="btn"
                      onClick={() => this.showSwal(recipe._id)}
                      style={{ color: "green" }}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </React.Fragment>
                ) : null}
              </CardActions>
            )}
          </Card>
        </Zoom>
      </div>
    );
  }
}

export default Recipe;
