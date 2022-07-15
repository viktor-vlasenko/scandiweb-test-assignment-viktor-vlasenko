import { Component } from "react";
import { gql } from "@apollo/client/core";

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
        query: gql`
          {
            product(id: ${productId}) {
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
        console.log(result);
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
    this.getProductDetails(this.props.productId);
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

export default PDP;
