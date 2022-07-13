import React, { Component } from "react";

import arrowDownIcon from "../../../assets/arrow-down.svg";
import arrowUpIcon from "../../../assets/arrow-up.svg";
import classes from "./CurrencySwitcher.module.css";
import CurrencySwitcherMenu from "./CurrencySwitcherMenu";

class CurrencySwitcher extends Component {
  constructor() {
    super();
    this.state = {
      isClosed: true,
    };
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  currencyMenuToggle() {
    this.setState((current) => {
      return { isClosed: !current.isClosed };
    });
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({ isClosed: true });
    }
  }

  render() {
    return (
      <div ref={this.wrapperRef}>
        <button
          onClick={this.currencyMenuToggle.bind(this)}
          className={classes.switcher}
        >
          <p>$</p>
          <img
            src={this.state.isClosed ? arrowDownIcon : arrowUpIcon}
            alt="Opens and closes currency switcher menu"
          />
        </button>
        {!this.state.isClosed && <CurrencySwitcherMenu />}
      </div>
    );
  }
}

export default CurrencySwitcher;
