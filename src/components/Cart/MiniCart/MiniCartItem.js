import { Component } from "react";
import { connect } from "react-redux/es/exports";

import { findPrice } from "../../PLP/ProductsList";
import Attributes from "../../PDP/Attributes";
import ItemCountControls from "../CartItem/ItemCountControls";
import classes from "./MiniCartItem.module.css";

class MiniCartItem extends Component {
  render() {
    const { item, symbol } = this.props;

    return (
      <div className={classes["mini-cart-wrapper"]}>
        <div className={classes.description}>
          <p className={classes.brand}>{item.brand}</p>
          <p className={classes.name}>{item.name}</p>
          <p className={classes.price}>
            {symbol}
            {findPrice(item, symbol).amount}
          </p>
          <Attributes
            place="miniCart"
            attributes={item.attributes}
            selectedAttributes={item.selectedAttributes}
          />
        </div>
        <ItemCountControls item={item} place="miniCart" />
        <div className={classes["mini-cart-img"]}>
          <img src={item.gallery[0]} alt={item.name} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  symbol: state.currency.symbol,
});

export default connect(mapStateToProps)(MiniCartItem);
