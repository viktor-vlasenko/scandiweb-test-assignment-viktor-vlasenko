import { Component } from "react";

import classes from "./ItemCountControls.module.css";

class ItemCountControls extends Component {
  render() {
    return (
      <div className={classes.controls}>
        <button>+</button>
        <p>{this.props.itemCount}</p>
        <button>-</button>
      </div>
    );
  }
}

export default ItemCountControls;
