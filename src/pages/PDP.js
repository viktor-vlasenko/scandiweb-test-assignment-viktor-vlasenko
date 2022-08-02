import { Component } from "react";
import { gql } from "@apollo/client/core";
import { withRouter } from "react-router";
import { withApollo } from "@apollo/client/react/hoc";

import ProductDetails from "../components/PDP/ProductDetails";

class PDP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      productDetails: undefined,
    };
  }

  getProductDetails = (productId) => {
    this.props.client
      .query({
        variables: { productId },
        query: gql`
          query Product($productId: String!) {
            product(id: $productId) {
              id
              inStock
              name
              brand
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
              description
            }
          }
        `,
      })
      .then((result) => {
        this.setState({
          loading: result.loading,
          productDetails: result.data.product,
        });
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  componentDidMount() {
    this.setState({ loading: true });
    const { productId } = this.props.match.params;
    this.getProductDetails(productId);
  }

  render() {
    if (this.state.loading) {
      return <p>Loading...</p>;
    }

    if (this.state.error) {
      return <p>Error :( {this.error.message}</p>;
    }

    if (!this.state.productDetails) {
      return <p>Failed to find product :(</p>;
    }

    if (this.state.productDetails) {
      return <ProductDetails productDetails={this.state.productDetails} />;
    }
  }
}

export default withApollo(withRouter(PDP));
