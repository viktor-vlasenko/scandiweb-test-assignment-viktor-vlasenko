import { Component } from "react";

import Button from "../UI/Button";
import Attributes from "./Attributes";
import classes from "./ProductDescription.module.css";

class ProductDescription extends Component {
  render() {
    const product = this.props.product;

    return (
      <section className={classes.wrapper}>
        <h2 className={classes.brand}>{product.brand}</h2>
        <h3 className={classes.name}>{product.name}</h3>
        <Attributes attributes={product.attributes} />
        <div className={classes.price}>
          <h4>PRICE:</h4>
          <p className={classes.amount}>
            {product.prices[0].currency.symbol}
            {product.prices[0].amount}
          </p>
        </div>
        <Button text="ADD TO CART" className={classes.button} />
        <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
      </section>
    );
  }
}

export default ProductDescription;
