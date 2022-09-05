import { Component } from "react";
import { gql } from "@apollo/client";
import { withRouter } from "react-router";
import { withApollo } from "@apollo/client/react/hoc";

import ProductList from "../components/PLP/ProductsList";

class PLP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedProducts: [],
    };
  }

  componentDidMount() {
    const { category } = this.props.match.params;
    this.getCategoryContent(category);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params !== prevProps.match.params) {
      const { category } = this.props.match.params;
      this.getCategoryContent(category);
    }
  }

  // Fetches all categories and products from BE. Then saves result in state
  getCategoryContent = (categoryName) => {
    this.props.client
      .query({
        variables: { categoryName },
        query: gql`
          query Category($categoryName: String!) {
            category(input: { title: $categoryName }) {
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
          loadedProducts: result.data.category.products,
        });
      })
      .catch((error) => console.log(error));
  };

  render() {
    let { category } = this.props.match.params;
    let productsInCategory = this.state.loadedProducts;

    return (
      <ProductList categoryName={category} productList={productsInCategory} />
    );
  }
}

export default withApollo(withRouter(PLP));
