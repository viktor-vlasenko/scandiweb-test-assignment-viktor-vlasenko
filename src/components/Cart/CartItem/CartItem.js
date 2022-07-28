import { Component } from "react";

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
              {this.props.symbol}
              {findPrice(item, symbol).amount}
            </p>
          </div>
          <Attributes
            attributes={item.attributes}
            selectedAttributes={item.selectedAttributes}
          />
        </div>
        <ItemCountControls itemCount={item.itemCount} />
        <CartItemGallery gallery={item.gallery} name={item.name} />
      </div>
    );
  }
}

export default CartItem;
