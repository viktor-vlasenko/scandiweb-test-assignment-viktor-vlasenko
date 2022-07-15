import { Component } from "react";

import classes from "./Button.module.css";

class Button extends Component {
  render() {
    return (
      <button
        className={`${classes.button} ${this.props.className}`}
        onClick={this.props.onClick}
      >
        {this.props.text}
        {this.props.children}
      </button>
    );
  }
}

export default Button;
