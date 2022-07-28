import { Component } from "react";

import classes from "./ProductDetails.module.css";
import ProductDescription from "./ProductDescription";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainImage: undefined,
    };
  }

  changeImageHandler(event) {
    this.setState({ mainImage: event.target.src });
  }

  render() {
    const { gallery } = this.props.productDetails;

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
        <div className={classes.description}>
          <ProductDescription product={this.props.productDetails} />
        </div>
      </div>
    );
  }
}

export default ProductDetails;
