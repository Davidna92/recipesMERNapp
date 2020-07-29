import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { NavLink, Link } from "react-router-dom";
import UserName from "./userName";

class Header extends Component {
  render() {
    const { user } = this.props;
    return (
      <Navbar className="shadow-sm header" expand="lg">
        <div className="container">
          <Link className="navbar-brand ml-4" to="/">
            המתכוניה
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            {user && (
              <Nav className="text-center">
                <NavLink to="/my-recipes" className="nav-link">
                  המתכונים שלי
                </NavLink>
                <NavLink to="/fav-recipes" className="nav-link">
                  מתכונים שאהבתי
                </NavLink>
                <NavLink to="/create-recipe" style={{ textDecoration: "none" }}>
                  <Button variant="contained" color="primary">
                    מתכון חדש!
                  </Button>
                </NavLink>
              </Nav>
            )}
            
            <Nav className="float left mr-auto">
              {!user && (
                <React.Fragment>
                  <NavLink
                    to="/user/register"
                    style={{ textDecoration: "none" }}
                  >
                    <Button color="primary">הרשמה</Button>
                  </NavLink>
                  <NavLink to="/user/login" style={{ textDecoration: "none" }}>
                    <Button variant="outlined" color="primary">
                      התחברות
                    </Button>
                  </NavLink>
                </React.Fragment>
              )}
              {user && (
                <React.Fragment>
                  <UserName user={user} />
                  <NavLink to="/user/logout" style={{ textDecoration: "none" }}>
                    <Button variant="outlined" color="primary">
                      התנתק
                    </Button>
                  </NavLink>
                </React.Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    );
  }
}

export default Header;
