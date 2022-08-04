import { Component } from "react";
import { gql } from "@apollo/client";
import { withRouter } from "react-router";
import { withApollo } from "@apollo/client/react/hoc";

import ProductList from "../components/PLP/ProductsList";

class PLP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedCategories: undefined,
    };
  }

  componentDidMount() {
    this.getAllProducts();
  }

  // Fetches all categories and products from BE. Then saves result in state
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
                attributes {
                  type
                  name
                  id
                  items {
                    value
                    id
                  }
                }
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
          loadedCategories: result.data.categories,
        });
      })
      .catch((error) => console.log(error));
  };

  render() {
    let { category } = this.props.match.params;
    if (!category && this.state.loadedCategories) {
      category = this.state.loadedCategories[0].name;
    }
    let productsInCategory;
    if (this.state.loadedCategories) {
      productsInCategory = this.state.loadedCategories.find(
        (loadedCategory) => loadedCategory.name === category
      ).products;
    }

    return (
      <ProductList categoryName={category} productList={productsInCategory} />
    );
  }
}

export default withApollo(withRouter(PLP));
