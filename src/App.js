import { Component, Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { withApollo } from "@apollo/client/react/hoc";

import Header from "./components/Header/Header";
import PDP from "./pages/PDP";
import PLP from "./pages/PLP";
import CartPage from "./pages/CartPage";

class App extends Component {
  getDefaultCategoryName() {}

  render() {
    return (
      <Fragment>
        <Header />
        <Switch>
          <Route path="/" exact>
            <PLP />
          </Route>
          <Route path="/:category" exact>
            <PLP />
          </Route>
          <Route path="/cart" exact>
            <CartPage />
          </Route>
          <Route path="/product/:productId" exact>
            <PDP />
          </Route>
        </Switch>
      </Fragment>
    );
  }
}

export default withApollo(App);
