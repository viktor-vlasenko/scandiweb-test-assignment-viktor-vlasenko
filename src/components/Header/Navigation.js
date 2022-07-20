import { Component } from "react";
import { NavLink } from "react-router-dom";

import classes from "./Navigation.module.css";

class Navigation extends Component {
  render() {
    return (
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink activeClassName={classes.active} to="/" exact>
              WOMEN
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/men">
              MEN
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/kids">
              KIDS
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navigation;
