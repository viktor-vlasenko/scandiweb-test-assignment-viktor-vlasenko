import { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import classes from "./ProductCard.module.css";
import cartIcon from "../../assets/Empty Cart.svg";

class ProductCard extends Component {
  render() {
    const { id, name, brand, inStock, image, price, symbol } = this.props;

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
            <div className={classes.cart}>
              <img src={cartIcon} alt="Add to cart" />
            </div>
          )}

          <div className={classes.text}>
            <div className={classes.spacer} />
            <p className={`${classes.title} ${!inStock && classes["out-of-stock-content"]}`}>{brand + " " + name}</p>
            <p className={`${classes.price} ${!inStock && classes["out-of-stock-content"]}`}>{symbol}{price}</p>
          </div>
        </li>
      </Link>
    );
  }
}

export default withRouter(ProductCard);
