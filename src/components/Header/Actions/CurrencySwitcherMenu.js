import { Component } from "react";

import CurrencySwitcherMenuItem from "./CurrencySwitcherMenuItem";
import classes from "./CurrencySwitcherMenu.module.css";

const CURRENCY_LIST = [
  {
    label: "USD",
    symbol: "$",
  },
  {
    label: "GBP",
    symbol: "£",
  },
  {
    label: "AUD",
    symbol: "A$",
  },
  {
    label: "JPY",
    symbol: "¥",
  },
  {
    label: "RUB",
    symbol: "₽",
  },
];

class CurrencySwitcherMenu extends Component {
  render() {
    return (
      <ul className={classes.list}>
        {CURRENCY_LIST.map((currency) => (
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
