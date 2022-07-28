import { Component, Fragment } from "react";
import { connect } from "react-redux";

import ProductCard from "./ProductCard";
import classes from "./ProductList.module.css";

export const findPrice = (product, symbol) => {
  const foundPrice = product.prices.find(
    (price) => price.currency.symbol === symbol
  );
  return foundPrice;
};

class ProductList extends Component {
  render() {
    return (
      <Fragment>
        <h2 className={classes.category}>{this.props.categoryName}</h2>
        <ul className={classes.wrapper}>
          {this.props.productList &&
            this.props.productList.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                brand={product.brand}
                image={product.gallery[0]}
                price={findPrice(product, this.props.symbol).amount}
                inStock={product.inStock}
                symbol={this.props.symbol}
              />
            ))}
        </ul>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  symbol: state.currency.symbol,
});

export default connect(mapStateToProps)(ProductList);
