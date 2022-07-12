import { Component } from "react";

import classes from "./ProductCard.module.css";
import cartIcon from "../../assets/Empty Cart.svg";

class ProductCard extends Component {
  render() {
    return (
      <li className={classes.card}>
        <div className={classes.crop}>
          <img src={this.props.image} alt={this.props.name} />
        </div>
        <div className={classes.cart}>
          <img src={cartIcon} alt="Add to cart" />
        </div>
        <div className={classes.spacer} />
        <p className={classes.title}>{this.props.name}</p>
        <p className={classes.price}>${this.props.price}</p>
      </li>
    );
  }
}

export default ProductCard;
