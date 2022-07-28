import { Component } from "react";
import { connect } from "react-redux";

import classes from "./Actions.module.css";
import cartIcon from "../../../assets/Empty Cart Black.svg";
import CurrencySwitcher from "./CurrencySwitcher";
import { Link } from "react-router-dom";

class Actions extends Component {
  render() {
    return (
      <section className={classes.actions}>
        <CurrencySwitcher />
        <Link className={classes.cart} to='/cart'>
          <img src={cartIcon} alt="Cart opening button" />
          {this.props.cartItemsTotal !== 0 && (
            <div className={classes.number}>{this.props.cartItemsTotal}</div>
          )}
        </Link>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItemsTotal: state.cart.totalItems,
});

export default connect(mapStateToProps)(Actions);
