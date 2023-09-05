import { createContext, useState, useEffect } from "react";
import { GET_PRODUCTS } from "../graphqlQueries/queries";
import { ApolloError, useQuery } from "@apollo/client";

type productContextType = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  error: ApolloError | undefined;
  loading: boolean;
  getDetailsProduct: Function;
  setDetailsProduct: Function;
  getEditProduct: Function;
  setEditProduct: Function;
};

type productContextProps = {
  children: React.ReactNode;
};

export const ProductContext = createContext<productContextType | null>(null);

const ProductContextProvider: React.FC<productContextProps> = (props) => {
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  const [products, setProducts] = useState<Product[]>(data?.getProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const getSelectedProduct = (key: string) => {
    const jsonSelectedProduct = localStorage.getItem(key);
    return jsonSelectedProduct ? JSON.parse(jsonSelectedProduct) : null;
  };

  const setSelectedProductLS = (product: Product, key: string) => {
    localStorage.setItem(key, JSON.stringify(product));
    setSelectedProduct(product);
  };

  useEffect(() => setProducts(data?.getProducts), [data]);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        error,
        loading,
        getDetailsProduct: () => getSelectedProduct("detailsProduct"),
        setDetailsProduct: (product: Product) =>
          setSelectedProductLS(product, "detailsProduct"),
        getEditProduct: () => getSelectedProduct("editProduct"),
        setEditProduct: (product: Product) =>
          setSelectedProductLS(product, "editProduct"),
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
