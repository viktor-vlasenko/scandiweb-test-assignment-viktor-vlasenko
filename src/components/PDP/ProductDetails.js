import { Component } from "react";
import { gql } from "@apollo/client";

import classes from "./ProductDetails.module.css";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      productDetails: undefined,
      mainImage: undefined,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.getProductDetails();
  }

  changeImageHandler(event) {
    this.setState({ mainImage: event.target.src });
  }

  getProductDetails = () => {
    this.props.client
      .query({
        query: gql`
          {
            product(id: "huarache-x-stussy-le") {
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
      const gallery = this.state.productDetails.gallery;

      return (
        <div className={classes.wrapper}>
          <div className={classes.gallery}>
            {gallery.map((image) => (
              <img
                key={image}
                src={image}
                alt="Product"
                onClick={this.changeImageHandler.bind(this)}
              />
            ))}
          </div>
          <div className={classes.crop}>
            <img
              className={classes.image}
              src={this.state.mainImage || gallery[0]}
              alt="Product"
            />
          </div>
          <div className={classes.description}>Product Description</div>
        </div>
      );
    }
  }
}

export default ProductDetails;
