import { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import { withApollo } from "@apollo/client/react/hoc";
import { connect } from "react-redux";

import Header from "./components/Header/Header";
import PDP from "./pages/PDP";
import PLP from "./pages/PLP";
import CartPage from "./pages/CartPage";
import { cartActions } from "./store/cart-slice";

class App extends Component {
  // Loading cart if it is stored locally
  componentDidMount() {
    this.props.dispatch(cartActions.replaceCart());
  }

  render() {
    return (
      <Fragment>
        <Header />
        <Switch>
          <Route path="/" exact>
            <PLP />
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
