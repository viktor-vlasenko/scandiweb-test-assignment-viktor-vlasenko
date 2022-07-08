import { Component } from "react";

import Layout from "./components/Layout/Layout";
import ProductList from "./components/PLP/ProductsList";

class App extends Component {
  render() {
    return (
      <Layout>
        <ProductList />
      </Layout>
    );
  }
}

export default App;
