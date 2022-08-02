import { Component } from "react";
import { connect } from "react-redux";
import { cartActions } from "../../../store/cart-slice";

import classes from "./ItemCountControls.module.css";

class ItemCountControls extends Component {
  addItem(item) {
    this.props.dispatch(cartActions.addItem({ ...item }));
  }

  removeItem(item) {
    this.props.dispatch(cartActions.removeItem(item));
  }

  render() {
    return (
      <div className={classes.controls}>
        <button onClick={this.addItem.bind(this, this.props.item)}>+</button>
        <p>{this.props.item.itemCount}</p>
        <button onClick={this.removeItem.bind(this, this.props.item)}>-</button>
      </div>
    );
  }
}

export default connect()(ItemCountControls);
