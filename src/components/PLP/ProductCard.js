import { Component } from "react";

import classes from "./ProductCard.module.css";

class ProductCard extends Component {
  render() {
    return (
      <li className={classes.card}>
        <div>{this.props.image}</div>
        <h4>{this.props.name}</h4>
        <h3>${this.props.price}</h3>
      </li>
    );
  }
}

export default ProductCard;
