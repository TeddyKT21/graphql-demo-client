import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      _id
      description
      image
      name
      quantity
      price
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($_id: string) {
    findById(_id: $_id) {
      _id
      description
      image
      name
      quantity
      price
    }
  }
`;


