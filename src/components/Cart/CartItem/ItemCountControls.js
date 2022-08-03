import { Component } from "react";
import { connect } from "react-redux";
import { cartActions } from "../../../store/cart-slice";

import cartClasses from "./ItemCountControls.module.css";
import miniCartClasses from "../MiniCart/MiniCartItemCountControls.module.css";

class ItemCountControls extends Component {
  addItem(item) {
    this.props.dispatch(cartActions.addItem({ ...item }));
  }

  removeItem(item) {
    this.props.dispatch(cartActions.removeItem(item));
  }

  render() {
    const classes = this.props.place === "cart" ? cartClasses : miniCartClasses;

    return (
      <div className={classes.controls}>
        <button
          className={classes.plus}
          onClick={this.addItem.bind(this, this.props.item)}
        />
        <p>{this.props.item.itemCount}</p>
        <button
          className={classes.minus}
          onClick={this.removeItem.bind(this, this.props.item)}
        />
      </div>
    );
  }
}

export default connect()(ItemCountControls);
