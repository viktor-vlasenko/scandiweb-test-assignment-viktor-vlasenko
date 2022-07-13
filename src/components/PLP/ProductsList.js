import { Component, Fragment } from "react";

import ProductCard from "./ProductCard";
import classes from "./ProductList.module.css";

class ProductList extends Component {
  

  render() {
    return (
      <Fragment>
        <h2 className={classes.category}>{this.props.categoryName}</h2>
        <ul className={classes.wrapper}>
          {this.props.productList.map((product) => (
            <ProductCard
            key={product.id}
            name={product.name}
            brand={product.brand}
            image={product.gallery[0]}
            price={product.prices[0].amount}
            inStock={product.inStock}
          />
          ))}
        </ul>
      </Fragment>
    );
  }
}

export default ProductList;
