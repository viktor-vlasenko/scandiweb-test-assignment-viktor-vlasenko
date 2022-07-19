import { Component } from "react";
import { gql } from "@apollo/client";

import ProductList from "../components/PLP/ProductsList";

class PLP extends Component {
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
    return (
      <ProductList
        categoryName={this.state.categoryName}
        productList={this.state.loadedProducts}
      />
    );
  }
}

export default PLP;
