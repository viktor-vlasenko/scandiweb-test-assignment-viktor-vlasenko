import { Component, Fragment } from "react";

import ProductCard from "./ProductCard";
import classes from "./ProductList.module.css";

const DUMMY_PRODUCTS = [
  { id: "01", image: "*Image*", name: "White T-Shirt", price: 8.95 },
  { id: "02", image: "*Image*", name: "Blue Pants", price: 24.95 },
  { id: "03", image: "*Image*", name: "Black Hoodie", price: 15.95 },
  { id: "04", image: "*Image*", name: "Green T-Shirt", price: 8.95 },
  { id: "05", image: "*Image*", name: "Grey Pants", price: 24.95 },
  { id: "06", image: "*Image*", name: "Red Hoodie", price: 15.95 },
];

class ProductList extends Component {
  render() {
    return (
      <Fragment>
        <h2 className={classes.title}>Category name</h2>
        <ul className={classes.wrapper}>
          {DUMMY_PRODUCTS.map((product) => {
            return (
              <ProductCard
                key={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
              />
            );
          })}
        </ul>
      </Fragment>
    );
  }
}

export default ProductList;
