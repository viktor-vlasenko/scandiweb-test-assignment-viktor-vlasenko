import { Component } from "react";
import { connect } from "react-redux";

import { currencyActions } from "../../../store/currency-slice";

class CurrencySwitcherMenuItem extends Component {
  currencySwitchHandler() {
    this.props.dispatch(
      currencyActions.switchCurrency({
        label: this.props.currencyLabel,
        symbol: this.props.currencySymbol,
      })
    );
    this.props.menuClose();
  }

  render() {
    return (
      <li onClick={this.currencySwitchHandler.bind(this)}>
        <p>
          {this.props.currencySymbol} {this.props.currencyLabel}
        </p>
      </li>
    );
  }
}

const mapStateToProps = (state) => ({
  label: state.currency.label,
  symbol: state.currency.symbol,
});

export default connect(mapStateToProps)(CurrencySwitcherMenuItem);
