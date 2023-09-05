import { useContext, useEffect, useState } from "react";
import "../styles/pages.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_PRODUCT, UPDATE_PRODUCT } from "../graphqlQueries/mutations";
import { StatusDisplay } from "../components/StatusDisplay";
import { ProductContext } from "../context/productContext";
function checkValidity(product: Product) {
  const keys = Object.keys(product).filter((k) => k !== "image" && k !== "_id");
  let isValid = true;
  keys.forEach((key) => (isValid = isValid && !!product[key]));
  return isValid;
}

export const EditProduct = ({product}:{product:Product}) => {
  const newProduct: Product = {
    name: "",
    description: "",
    image: "",
    quantity: 0,
    price: 0,
    _id: "",
  };
  const navigate = useNavigate();
  const [editedProduct, setEditedProduct] = useState(product || newProduct);
  const [addProduct, { data: addData, loading: addLoading, error: addError }] =
    useMutation(ADD_PRODUCT);
  const [
    editProduct,
    { data: editData, loading: editLoading, error: editError },
  ] = useMutation(UPDATE_PRODUCT);
  const { setProducts } = useContext(ProductContext)!;

  if (addData) {
    setProducts((prevProducts) => [...prevProducts, addData!.addProduct]);
    navigate("/");
  }

  if (editData) {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      const updateIndex = prevProducts.findIndex(
        (p) => p._id === editedProduct?._id
      );
      updatedProducts[updateIndex] = editedProduct;
      return updatedProducts;
    });
    navigate("/");
  }

  useEffect(() => {
    if (editedProduct === product || editedProduct === newProduct) return;
  }, [editedProduct]);
  console.log(addData);

  const setProduct = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEditedProduct((prev) => {
      const input = e.target as HTMLInputElement;
      const field = input.name as keyof Product;
      const editedProduct = { ...prev } as Product;
      editedProduct[field] = input.value;
      return editedProduct;
    });

  const saveChanges = async () => {
    if (!editedProduct || !checkValidity(editedProduct)) return;
    const { name, description, quantity, image, price } = editedProduct;
    const productData = {
      name,
      description,
      quantity: Number(quantity),
      image,
      price: Number(price),
    };
    editedProduct._id ? 
    await editProduct({variables: { productData, id: editedProduct._id }}) :
    await addProduct({ variables: { productData } });
  };
  return (
    <div className="EditPage page">
      <h1>{(product && "Edit Product") || "Add Product"}</h1>
      <form className="editForm">
        <label>
          name
          <input
            className="editInput"
            defaultValue={editedProduct?.name}
            type="text"
            name="name"
            // onChange={setProduct}
            onBlur={setProduct}
          ></input>
        </label>
        <label>
          description
          <input
            className="editInput"
            defaultValue={editedProduct?.description}
            type="text"
            name="description"
            // onChange={setProduct}
            onBlur={setProduct}
          ></input>
        </label>
        <label>
          image
          <input
            className="editInput"
            defaultValue={editedProduct?.image}
            type="text"
            name="image"
            // onChange={setProduct}
            onBlur={setProduct}
          ></input>
        </label>
        <label>
          quantity
          <input
            className="editInput"
            defaultValue={editedProduct?.quantity}
            type="number"
            name="quantity"
            // onChange={setProduct}
            onBlur={setProduct}
          ></input>
        </label>
        <label>
          price
          <input
            className="editInput"
            defaultValue={editedProduct?.price}
            type="number"
            name="price"
            step={0.01}
            // onChange={setProduct}
            onBlur={setProduct}
          ></input>
        </label>
        <input type="button" onClick={saveChanges} value={"Save"}></input>
      </form>
      <StatusDisplay
        error={addError || editError}
        loading={addLoading || editLoading}
        loadingMessage="saving data..."
        errorMessage={addError?.message || editError?.message}
      />
    </div>
  );
};
