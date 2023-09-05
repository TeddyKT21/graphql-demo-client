import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
  mutation AddProduct($productData: ProductData!) {
    addProduct(productData: $productData) {
      description
      image
      name
      price
      quantity
      _id
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: String!, $productData: ProductData!) {
    updateProduct(_id: $id, productData: $productData) {
      description
      image
      name
      quantity
      price
      _id
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: String!) {
    deleteProduct(_id: $id) {
      description
      image
      name
      quantity
      price
      _id
    }
  }
`;
