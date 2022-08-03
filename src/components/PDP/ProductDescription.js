import { Component } from "react";
import { connect } from "react-redux";

import { cartActions } from "../../store/cart-slice";
import Button from "../UI/Button";
import Attributes from "./Attributes";
import classes from "./ProductDescription.module.css";

class ProductDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAttributes: [],
    };
  }

  componentDidMount() {
    // Setting default product attributes
    const attributes = this.props.product.attributes;
    if (attributes.length === 0) {
      return;
    }
    let defaultAttributes = [];
    attributes.forEach((attr) => {
      const attributeId = attr.id;
      defaultAttributes.push({
        attributeId,
        attributeItemId: attr.items[0].id,
      });
    });
    this.setState({ selectedAttributes: defaultAttributes });
  }

  attributeChangeHandler(attribute) {
    const currentSelectedAttributes = [...this.state.selectedAttributes];
    const attributeToChange = currentSelectedAttributes.find(
      (attr) => attr.attributeId === attribute.attrId
    );
    attributeToChange.attributeItemId = attribute.itemId;
    this.setState({ selectedAttributes: currentSelectedAttributes });
  }

  findPrice(product) {
    const foundPrice = product.prices.find(
      (price) => price.currency.symbol === this.props.symbol
    );
    return foundPrice;
  }

  addToCartHandler() {
    if (!this.props.product.inStock) return;
    const selectedAttributes = [...this.state.selectedAttributes];
    this.props.dispatch(
      cartActions.addItem({
        selectedAttributes,
        ...this.props.product,
      })
    );
  }

  render() {
    const product = this.props.product;

    const buttonClasses = product.inStock ? classes.button : classes.disabled;

    return (
      <section className={classes.wrapper}>
        <h2 className={classes.brand}>{product.brand}</h2>
        <h3 className={classes.name}>{product.name}</h3>
        <Attributes
          place="PDP"
          attributes={product.attributes}
          selectedAttributes={this.state.selectedAttributes}
          onAttributeChange={this.attributeChangeHandler.bind(this)}
        />
        <div className={classes.price}>
          <h4>PRICE:</h4>
          <p className={classes.amount}>
            {this.props.symbol}
            {this.findPrice(product).amount}
          </p>
        </div>
        <Button
          text="ADD TO CART"
          className={buttonClasses}
          onClick={this.addToCartHandler.bind(this)}
        />
        <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  symbol: state.currency.symbol,
});

export default connect(mapStateToProps)(ProductDescription);
