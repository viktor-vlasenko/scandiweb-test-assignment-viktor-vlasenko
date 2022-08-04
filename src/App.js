import { Component, Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { gql } from "@apollo/client";
import { withApollo } from "@apollo/client/react/hoc";
import { connect } from "react-redux";

import Header from "./components/Header/Header";
import PDP from "./pages/PDP";
import PLP from "./pages/PLP";
import CartPage from "./pages/CartPage";
import { cartActions } from "./store/cart-slice";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultCategory: "",
    };
  }

  componentDidMount() {
    this.getDefaultURL();
    // Loading cart if it is stored locally
    this.props.dispatch(cartActions.replaceCart());
  }

  // Getting category name to redirect to by default after application launch
  getDefaultURL() {
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
          defaultCategory: result.data.categories[0].name,
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <Fragment>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Redirect to={`/${this.state.defaultCategory}`} />
          </Route>
          <Route path="/cart" exact>
            <CartPage />
          </Route>
          <Route path="/:category" exact>
            <PLP />
          </Route>
          <Route path="/product/:productId" exact>
            <PDP />
          </Route>
        </Switch>
      </Fragment>
    );
  }
}

export default withApollo(connect()(App));
