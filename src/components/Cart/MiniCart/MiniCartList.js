import { Component } from "react";
import MiniCartItem from "./MiniCartItem";

import classes from './MiniCartList.module.css'

class MiniCartList extends Component {
  render() {
    return (
      <section className={classes.list}>
        {this.props.cartItems.map((item) => (
          <MiniCartItem key={this.props.cartItems.indexOf(item)} item={item} />
        ))}
      </section>
    );
  }
}

export default MiniCartList;
