import { Component } from "react";
import { NavLink } from "react-router-dom";
import { withApollo } from "@apollo/client/react/hoc";

import classes from "./Navigation.module.css";

class Navigation extends Component {
  render() {
    return (
      <nav className={classes.nav}>
        <ul>
          {this.props.categories.map((category) => (
            <li key={category.name}>
              <NavLink
                activeClassName={classes.active}
                to={`/${category.name}`}
                exact
              >
                {category.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default withApollo(Navigation);
