import { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import { calculateTotalAmount } from "../Cart";
import Button from "../../UI/Button";
import MiniCartList from "./MiniCartList";
import classes from "./MiniCart.module.css";

class MiniCart extends Component {
  cartCloseHandler() {
    this.props.onCartClose();
  }

  render() {
    const { symbol, cartItems, totalItems } = this.props;

    const totalAmount = calculateTotalAmount(cartItems, symbol);

    return (
      <Fragment>
        <div
          className={classes.backdrop}
          onClick={this.cartCloseHandler.bind(this)}
        ></div>
        <div className={classes.mini}>
          <div className={classes.header}>
            <h3>
              My Bag, <span>{totalItems} items</span>
            </h3>
          </div>
          <MiniCartList cartItems={cartItems} />
          <section className={classes.footer}>
            <div className={classes.summary}>
              <p className={classes.total}>Total</p>
              <p className={classes.amount}>
                {symbol}
                {totalAmount}
              </p>
            </div>
            <div className={classes["mini-cart-actions"]}>
              <Link to="/cart">
                <Button
                  className={classes.bag}
                  text="view bag"
                  onClick={this.cartCloseHandler.bind(this)}
                />
              </Link>
              <Button text="check out" />
            </div>
          </section>
        </div>
      </Fragment>
    );
  }
}

export default MiniCart;
