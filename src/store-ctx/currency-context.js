import { createContext } from "react";

const CurrencyContext = createContext({
  symbol: "$",
  label: "USD",
  onSwitch: () => {},
});

const currencyReducer = (state, action) => {
  if (action.type === "SWITCH") {
    return {
      symbol: action.symbol,
      label: action.label,
    };
  }
  return {
    symbol: "$",
    label: "USD",
  };
};

export default CurrencyContext;
