import { Component } from "react";
import { gql } from "@apollo/client";
import { withRouter } from "react-router";
import { withApollo } from "@apollo/client/react/hoc";

import ProductList from "../components/PLP/ProductsList";

class PLP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedData: undefined,
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
            categories {
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
          loadedData: result.data.categories,
        });
      })
      .catch((error) => console.log(error));
  };

  render() {
    let { category } = this.props.match.params;
    if (!category && this.state.loadedData) {
      category = this.state.loadedData[0].name;
    }
    let productsInCategory;
    if (this.state.loadedData) {
      productsInCategory = this.state.loadedData.find(
        (loadedCategory) => loadedCategory.name === category
      ).products;
    }

    return (
      <ProductList categoryName={category} productList={productsInCategory} />
    );
  }
}

export default withApollo(withRouter(PLP));
