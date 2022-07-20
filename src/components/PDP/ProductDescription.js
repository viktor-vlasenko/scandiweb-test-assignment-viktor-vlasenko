import { Component } from "react";
import { connect } from "react-redux";

import Button from "../UI/Button";
import Attributes from "./Attributes";
import classes from "./ProductDescription.module.css";

class ProductDescription extends Component {
  findPrice(product) {
    const foundPrice = product.prices.find(
      (price) => price.currency.symbol === this.props.symbol
    );
    return foundPrice;
  }

  render() {
    const product = this.props.product;

    return (
      <section className={classes.wrapper}>
        <h2 className={classes.brand}>{product.brand}</h2>
        <h3 className={classes.name}>{product.name}</h3>
        <Attributes attributes={product.attributes} />
        <div className={classes.price}>
          <h4>PRICE:</h4>
          <p className={classes.amount}>
            {this.props.symbol}
            {this.findPrice(product).amount}
          </p>
        </div>
        <Button text="ADD TO CART" className={classes.button} />
        <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  symbol: state.currency.symbol,
});

export default connect(mapStateToProps)(ProductDescription);
