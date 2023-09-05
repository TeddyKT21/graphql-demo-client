import { Route, Routes } from "react-router-dom";
import { ProductsPage } from "../pages/ProductsPage";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import { Details } from "../pages/Details";
import { EditProduct } from "../pages/Edit";
import { useContext, useState } from "react";
import { ProductContext } from "../context/productContext";
export const Main = () => {
    const {getDetailsProduct, getEditProduct} = useContext(ProductContext)!;
    const detailsProduct = getDetailsProduct();
    const editProduct = getEditProduct();
  return (
      <div id="main">
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/details" element={<Details product={detailsProduct}/>} />
          <Route path="/editProduct" element={<EditProduct product={editProduct}/>} />
          <Route path="/addProduct" element={<EditProduct product={null}/>} />
        </Routes>
      </div>
  );
};
