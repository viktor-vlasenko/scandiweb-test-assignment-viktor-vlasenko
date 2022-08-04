import { Component } from "react";
import { NavLink } from "react-router-dom";
import { gql } from "@apollo/client/core";
import { withApollo } from "@apollo/client/react/hoc";

import classes from "./Navigation.module.css";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: false,
      categories: [],
    };
  }
  
  componentDidMount() {
    this.setState({ loading: true });
    this.getAllCategories();
  }

  // Receives categories list from BE and stores it in state
  getAllCategories() {
    this.props.client
      .query({
        query: gql`
          {
            categories {
              name
            }
          }
        `,
      })
      .then((result) => {
        this.setState({
          loading: result.loading,
          categories: result.data.categories,
        });
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  render() {
    return (
      <nav className={classes.nav}>
        <ul>
          {this.state.categories.map((category) => (
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
