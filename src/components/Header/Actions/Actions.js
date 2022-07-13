import { Component } from "react";

import classes from "./Actions.module.css";
import cartIcon from "../../../assets/Empty Cart Black.svg";
import CurrencySwitcher from "./CurrencySwitcher";

class Actions extends Component {
  render() {
    return (
      <section className={classes.actions}>
        <CurrencySwitcher />
        <div className={classes.cart}>
          <img src={cartIcon} alt="Cart opening button" />
        </div>
      </section>
    );
  }
}

export default Actions;
