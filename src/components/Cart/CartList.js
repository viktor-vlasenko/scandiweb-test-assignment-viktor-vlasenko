import { Component } from "react";

import CartItem from "./CartItem/CartItem";
import classes from "./CartList.module.css";

class CartList extends Component {
  render() {
    return (
      <section className={classes.list}>
        {this.props.cartItems.map((item) => (
          <CartItem
            key={this.props.cartItems.indexOf(item)}
            item={item}
            symbol={this.props.symbol}
          />
        ))}
      </section>
    );
  }
}

export default CartList;
