import { Component } from "react";

import CurrencySwitcherMenuItem from "./CurrencySwitcherMenuItem";
import classes from "./CurrencySwitcherMenu.module.css";

class CurrencySwitcherMenu extends Component {
  render() {
    return (
      <ul className={classes.list}>
        {this.props.currencyList.map((currency) => (
          <CurrencySwitcherMenuItem
            key={currency.label}
            currencyLabel={currency.label}
            currencySymbol={currency.symbol}
            menuClose={this.props.menuClose.bind(this)}
          />
        ))}
      </ul>
    );
  }
}

export default CurrencySwitcherMenu;
