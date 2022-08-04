import { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import classes from "./ProductCard.module.css";
import cartIcon from "../../assets/Empty Cart.svg";
import { connect } from "react-redux";
import { cartActions } from "../../store/cart-slice";

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAttributes: [],
    };
  }

  componentDidMount() {
    this.setDefaultAttributes();
  }

  /**
   * Setting default values of product attributes
   * Attributes are not displayed on PLP, but they are needed to add product to cart from PLP
   */
  setDefaultAttributes() {
    const { attributes } = this.props;
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

  // Adds product to the cart with the defaul attribute values
  addToCartHandler(e) {
    e.preventDefault();
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
    const { id, name, brand, inStock } = this.props.product;
    const { image, price, symbol } = this.props;

    return (
      <Link to={`/product/${id}`} className={classes.link}>
        <li className={classes.card}>
          <div className={classes.crop}>
            {!inStock && (
              <div className={classes["out-of-stock"]}>
                <div className={classes.overlay} />
                <p className={classes.text}>OUT OF STOCK</p>
              </div>
            )}

            <img src={image} alt={brand + " " + name} />
          </div>

          {inStock && (
            <button
              className={classes.cart}
              onClick={this.addToCartHandler.bind(this)}
            >
              <img src={cartIcon} alt="Add to cart" />
            </button>
          )}

          <div className={classes.text}>
            <div className={classes.spacer} />
            <p
              className={`${classes.title} ${
                !inStock && classes["out-of-stock-content"]
              }`}
            >
              {brand + " " + name}
            </p>
            <p
              className={`${classes.price} ${
                !inStock && classes["out-of-stock-content"]
              }`}
            >
              {symbol}
              {price}
            </p>
          </div>
        </li>
      </Link>
    );
  }
}

export default connect()(withRouter(ProductCard));
