import { Component, Fragment } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import PDP from "./pages/PDP";
import PLP from "./pages/PLP";
import CartPage from './pages/CartPage'

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Routes>
          <Route path="/" element={<PLP client={this.props.client} />} />
          <Route path="/women" element={<PLP client={this.props.client} />} />
          <Route path="/men" element={<PLP client={this.props.client} />} />
          <Route path="/kids" element={<PLP client={this.props.client} />} />
          <Route path="/:productId" element={<PDP client={this.props.client} />} />
          <Route path='/cart' element={<CartPage />} />
        </Routes>
      </Fragment>
    );
  }
}

export default App;
