import { Component } from "react";
import { connect } from "react-redux";

import MiniCart from "../../Cart/MiniCart/MiniCart";
import CurrencySwitcher from "./CurrencySwitcher";
import classes from "./Actions.module.css";
import cartIcon from "../../../assets/Empty Cart Black.svg";

class Actions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartDisplayed: false,
    };
  }

  cartToggle() {
    this.setState((state) => {
      return { cartDisplayed: !state.cartDisplayed };
    });
  }

  render() {
    return (
      <section className={classes.actions}>
        <CurrencySwitcher />
        <button className={classes.cart} onClick={this.cartToggle.bind(this)}>
          <img src={cartIcon} alt="Cart opening button" />
          {this.props.cartItemsTotal !== 0 && (
            <div className={classes.number}>{this.props.cartItemsTotal}</div>
          )}
        </button>
        {this.state.cartDisplayed && (
          <MiniCart
            onCartClose={this.cartToggle.bind(this)}
            cartItems={this.props.cartItems}
            totalItems={this.props.cartItemsTotal}
            symbol={this.props.symbol}
          />
        )}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItemsTotal: state.cart.totalItems,
  cartItems: state.cart.items,
  symbol: state.currency.symbol,
});

export default connect(mapStateToProps)(Actions);
