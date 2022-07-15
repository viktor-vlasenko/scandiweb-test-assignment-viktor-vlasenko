import { Component, Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { gql } from "@apollo/client";

import Header from "./components/Header/Header";
import ProductList from "./components/PLP/ProductsList";
import PDP from "./pages/PDP";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedProducts: [],
      categoryName: "Category name",
    };
  }

  componentDidMount() {
    this.getAllProducts();
  }

  getAllProducts = () => {
    this.props.client
      .query({
        query: gql`
          {
            category {
              name
              products {
                id
                name
                brand
                description
                inStock
                gallery
                prices {
                  currency {
                    label
                    symbol
                  }
                  amount
                }
              }
            }
          }
        `,
      })
      .then((result) => {
        this.setState({
          loadedProducts: result.data.category.products,
          categoryName: result.data.category.name,
        });
      });
  };

  render() {
    const content = (
      <ProductList
        categoryName={this.state.categoryName}
        productList={this.state.loadedProducts}
      />
    );

    return (
      <Fragment>
        <Header />
        <Routes>
          <Route path="/" element={content} />
          <Route path="/women" element={content} />
          <Route path="/men" element={content} />
          <Route path="/kids" element={content} />
          <Route path="/productId" element={<PDP client={this.props.client}/>} />
        </Routes>
      </Fragment>
    );
  }
}

export default App;
