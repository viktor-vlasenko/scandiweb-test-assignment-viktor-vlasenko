import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import { Component } from "react";
import ProductCard from "../components/PLP/ProductCard";

export const GET_PRODUCTS = gql`
  {
    category {
      products {
        id
        name
        inStock
        gallery
        prices {
          currency {
            label
          }
          amount
        }
      }
    }
  }
`;

class Data extends Component {
  render() {
    let content;
    <Query query={GET_PRODUCTS}>
      {({ loading, error, data }) => {
        if (loading) content = <p>Loading...</p>;
        if (error) content = <p>Error :(</p>;

        content = data.category.products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            image={product.gallery[0]}
          />
        ));
      }}
    </Query>;

    return content;
  }
}

export default Data;
