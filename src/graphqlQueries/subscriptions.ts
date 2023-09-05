import { gql } from "@apollo/client";

export const PRODUCTS_SUBSCRIPTION = gql`
  subscription ProductCreated() {
    productCreated {
    name
    description
    price
    quantity
    image
    _id
  }
  }
`;