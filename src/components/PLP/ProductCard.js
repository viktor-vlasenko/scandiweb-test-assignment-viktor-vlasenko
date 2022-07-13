import { Component } from "react";

import classes from "./ProductCard.module.css";
import cartIcon from "../../assets/Empty Cart.svg";

class ProductCard extends Component {
  render() {
    return (
      <li className={classes.card}>
        <div className={classes.crop}>
          {!this.props.inStock && (
            <div className={classes["out-of-stock"]}>
              <div className={classes.overlay} />
              <p className={classes.text}>OUT OF STOCK</p>
            </div>
          )}

          <img
            src={this.props.image}
            alt={this.props.brand + " " + this.props.name}
          />
        </div>

        {this.props.inStock && (
          <div className={classes.cart}>
            <img src={cartIcon} alt="Add to cart" />
          </div>
        )}
        
        <div className={classes.spacer} />
        <p
          className={`${classes.title} ${
            !this.props.inStock && classes["out-of-stock-content"]
          }`}
        >
          {this.props.brand + " " + this.props.name}
        </p>
        <p
          className={`${classes.price} ${
            !this.props.inStock && classes["out-of-stock-content"]
          }`}
        >
          ${this.props.price}
        </p>
      </li>
    );
  }
}

export default ProductCard;
