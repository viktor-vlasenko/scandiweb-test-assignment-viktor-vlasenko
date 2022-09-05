import { Component } from "react";

import Navigation from "./Navigation";
import Actions from "./Actions/Actions";
import classes from "./Header.module.css";
import logoIcon from "../../assets/a-logo.svg";

class Header extends Component {
  render() {
    return (
      <header className={classes.header}>
        <Navigation categories={this.props.categoryList} />
        <span className={classes.logo}>
          <img src={logoIcon} alt="Logo of the shop" />
        </span>
        <Actions />
      </header>
    );
  }
}

export default Header;
