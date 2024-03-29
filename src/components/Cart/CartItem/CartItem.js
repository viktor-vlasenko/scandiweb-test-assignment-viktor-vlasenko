import { Component } from "react";
import { connect } from "react-redux";

import Attributes from "../../PDP/Attributes";
import ItemCountControls from "./ItemCountControls";
import CartItemGallery from "./CartItemGallery";
import { findPrice } from "../../PLP/ProductsList";
import classes from "./CartItem.module.css";

class CartItem extends Component {
  render() {
    const { item, symbol } = this.props;

    return (
      <div className={classes["cart-wrapper"]}>
        <div className={classes.description}>
          <h2 className={classes.brand}>{item.brand}</h2>
          <h3 className={classes.name}>{item.name}</h3>
          <div className={classes.price}>
            <p className={classes.amount}>
              {symbol}
              {symbol && findPrice(item, symbol).amount}
            </p>
          </div>
          <Attributes
            attributes={item.attributes}
            selectedAttributes={item.selectedAttributes}
          />
        </div>
        <ItemCountControls item={item} place="cart" />
        <CartItemGallery gallery={item.gallery} name={item.name} />
      </div>
    );
  }
}

export default connect()(CartItem);
