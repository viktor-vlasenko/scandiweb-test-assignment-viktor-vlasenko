import { Component } from "react";

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
          <li key={currency.label}>
            <p>{currency.symbol} {currency.label}</p>
          </li>
        ))}
      </ul>
    );
  }
}

export default CurrencySwitcherMenu;
