import { Link } from "react-router-dom";
import { ProductContext } from "../context/productContext";
import { useContext } from 'react';

export const Header = () => {
  const {setDetailsProduct: setSelectedProduct} = useContext(ProductContext)!;
  return (
    <div id="header">
        <div className="linkGroup">
            <Link to={"/"}>Products</Link>
            <Link to={"/addProduct"} onClick={() => setSelectedProduct(null)}>Add Product</Link>
        </div>
      <div className="linkGroup">
        <Link to={"/signUp"}>Sign Up</Link>
        <Link to={"/login"}>Login</Link>
      </div>
    </div>
  );
};
