import { Component } from "react";

import classes from "./ProductCard.module.css";
import cartIcon from "../../assets/Empty Cart.svg";

class ProductCard extends Component {
  render() {
    const { name, brand, inStock, image, price, symbol } = this.props;

    return (
      <li className={classes.card}>
        <div className={classes.crop}>
          {!inStock && (
            <div className={classes["out-of-stock"]}>
              <div className={classes.overlay} />
              <p className={classes.text}>OUT OF STOCK</p>
            </div>
          )}

          <img src={image} alt={brand + " " + name} />
        </div>

        {inStock && (
          <div className={classes.cart}>
            <img src={cartIcon} alt="Add to cart" />
          </div>
        )}

        <div className={classes.spacer} />
        <p
          className={`${classes.title} ${
            !inStock && classes["out-of-stock-content"]
          }`}
        >
          {brand + " " + name}
        </p>
        <p
          className={`${classes.price} ${
            !inStock && classes["out-of-stock-content"]
          }`}
        >
          {symbol}
          {price}
        </p>
      </li>
    );
  }
}

export default ProductCard;
