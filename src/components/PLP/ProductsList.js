import { Component, Fragment } from "react";
import { connect } from "react-redux";

import ProductCard from "./ProductCard";
import classes from "./ProductList.module.css";

class ProductList extends Component {
  findPrice(product) {
    const foundPrice = product.prices.find(
      (price) => price.currency.symbol === this.props.symbol
    );
    return foundPrice;
  }

  render() {
    return (
      <Fragment>
        <h2 className={classes.category}>{this.props.categoryName}</h2>
        <ul className={classes.wrapper}>
          {this.props.productList.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              brand={product.brand}
              image={product.gallery[0]}
              price={this.findPrice(product).amount}
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
