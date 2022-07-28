import { Component } from "react";
import { connect } from "react-redux";

import CartList from "./CartList";
import Button from "../UI/Button";
import { findPrice } from "../PLP/ProductsList";
import classes from "./Cart.module.css";

class Cart extends Component {
  calculateTotalAmount(items, currencySymbol) {
    let totalAmount = 0;
    for (let item of items) {
      totalAmount += item.itemCount * findPrice(item, currencySymbol).amount;
    }
    return totalAmount.toFixed(2);
  }

  render() {
    const { symbol, totalItems, cartItems } = this.props;
    const totalAmount = this.calculateTotalAmount(cartItems, symbol);
    const taxAmount = (0.21 * totalAmount).toFixed(2);

    return (
      <div className={classes.cart}>
        <h2>CART</h2>
        <CartList cartItems={cartItems} symbol={symbol} />
        <div className={classes.summary}>
          <p>Tax 21%:</p>
          <span>
            {symbol}
            {taxAmount}
          </span>
          <p>Quantity:</p>
          <span>{totalItems}</span>
          <p className={classes.total}>Total:</p>
          <span className={classes.amount}>
            {symbol}
            {totalAmount}
          </span>
        </div>
        <Button className={classes.order} text="ORDER" />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  totalItems: state.cart.totalItems,
  cartItems: state.cart.items,
  symbol: state.currency.symbol,
});
export default connect(mapStateToProps)(Cart);
