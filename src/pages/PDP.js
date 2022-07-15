import { Component } from "react";

import ProductDetails from "../components/PDP/ProductDetails";

class PDP extends Component {
  render() {
    return <ProductDetails client={this.props.client}/>;
  }
}

export default PDP;
