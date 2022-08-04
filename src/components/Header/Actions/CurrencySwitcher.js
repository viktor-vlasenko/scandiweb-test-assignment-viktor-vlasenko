import React, { Component } from "react";
import { connect } from "react-redux";
import { gql } from "@apollo/client";
import { withApollo } from "@apollo/client/react/hoc";

import arrowDownIcon from "../../../assets/arrow-down.svg";
import arrowUpIcon from "../../../assets/arrow-up.svg";
import classes from "./CurrencySwitcher.module.css";
import CurrencySwitcherMenu from "./CurrencySwitcherMenu";
import { currencyActions } from "../../../store/currency-slice";

class CurrencySwitcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClosed: true,
      currencyList: undefined,
      loading: false,
      error: null,
    };
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.getCurrencyList();
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  // Receives list of currencies from BE, sets default currency, sets list of currencies
  getCurrencyList() {
    this.props.client
      .query({
        query: gql`
          {
            currencies {
              symbol
              label
            }
          }
        `,
      })
      .then((results) => {
        this.props.dispatch(
          currencyActions.switchCurrency({
            label: results.data.currencies[0].label,
            symbol: results.data.currencies[0].symbol,
          })
        );
        this.setState({
          currencyList: results.data.currencies,
          loading: results.loading,
        });
      })
      .catch((error) => this.setState({ error }));
  }

  currencyMenuToggle() {
    this.setState((current) => {
      return { isClosed: !current.isClosed };
    });
  }

  currencyMenuClose() {
    this.setState({ isClosed: true });
  }

  // Closes Currency Menu when user clicks outside of the Menu
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.currencyMenuClose();
    }
  }

  render() {
    if (this.state.loading) {
      return <p></p>;
    }

    if (this.state.error) {
      return <p></p>;
    }

    if (!this.state.currencyList) {
      return <p></p>;
    }

    if (this.state.currencyList) {
      return (
        <div ref={this.wrapperRef}>
          <button
            onClick={this.currencyMenuToggle.bind(this)}
            className={classes.switcher}
          >
            <p>{this.props.symbol}</p>
            <img
              src={this.state.isClosed ? arrowDownIcon : arrowUpIcon}
              alt="Opens and closes currency switcher menu"
            />
          </button>
          {!this.state.isClosed && (
            <CurrencySwitcherMenu
              currencyList={this.state.currencyList}
              menuClose={this.currencyMenuClose.bind(this)}
            />
          )}
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  symbol: state.currency.symbol,
});

export default connect(mapStateToProps)(withApollo(CurrencySwitcher));
