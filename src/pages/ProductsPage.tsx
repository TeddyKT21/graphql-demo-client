import { useEffect, useState,useContext } from "react";
import { SearchBar } from "../components/SearchBar";
import { ProductCard } from "../components/ProductCard";
import "../styles/pages.css";
import { StatusDisplay } from "../components/StatusDisplay";
import { ProductContext } from "../context/productContext";
import { useSubscription } from "@apollo/client";
import { PRODUCTS_SUBSCRIPTION } from "../graphqlQueries/subscriptions";

export const ProductsPage = () => {
  const {products:allProducts, loading, error} = useContext(ProductContext)!;
  const [displayedProducts, setProducts] = useState(allProducts);
  //שהגדרנו  subscriptionשימוש ב
  const {data} = useSubscription(PRODUCTS_SUBSCRIPTION);
  
  useEffect(() => setProducts(allProducts), [allProducts]);
  //כאשר המידע יתעדכן, נעדכן בהתאם את דף המוצרים שלנו ונוסיף אליו את המוצר החדש
  useEffect(() => setProducts((prev) => {
    console.log(data);
  if (data) {
    const copyPrev = [...prev];
    copyPrev.push(data.productCreated);
    return copyPrev;
  } else {
    return prev;
  }
  }),[data]);

  return (
    <div className="productsPage page">
      <SearchBar
        onSearch={(products: Product[]) => setProducts(products)}
        data={allProducts}
      />
      <div className="cardsContainer"
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        {displayedProducts?.map((p: Product) => (
          <ProductCard product={p} />
        ))}
      </div>
      <StatusDisplay
        loading={loading}
        loadingMessage={"fetching products..."}
        error={error}
        errorMessage={error?.message}
      />
    </div>
  );
};
