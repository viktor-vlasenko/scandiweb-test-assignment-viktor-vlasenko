import { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import PDP from "./pages/PDP";
import PLP from "./pages/PLP";
import CartPage from "./pages/CartPage";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Switch>
          <Route path="/" exact>
            <PLP client={this.props.client} />
          </Route>
          <Route path="/women" exact>
            <PLP client={this.props.client} />
          </Route>
          <Route path="/men" exact>
            <PLP client={this.props.client} />
          </Route>
          <Route path="/kids" exact>
            <PLP client={this.props.client} />
          </Route>
          <Route path="/cart" exact>
            <CartPage />
          </Route>
          <Route path="/:productId" exact>
            <PDP client={this.props.client} />
          </Route>
        </Switch>
      </Fragment>
    );
  }
}

export default App;
