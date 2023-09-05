import { useMutation } from "@apollo/client";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DELETE_PRODUCT } from "../graphqlQueries/mutations";
import { ProductContext } from "../context/productContext";
import { StatusDisplay } from "../components/StatusDisplay";

export const Details = ({product}: {product:Product}) => {
  const navigate = useNavigate();
  const [deleteFromServer, { data, error, loading }] =
    useMutation(DELETE_PRODUCT);
  const { setProducts,setEditProduct } = useContext(ProductContext)!;

  const deleteProduct = () => {
    console.log("deleting product: ", product);
    deleteFromServer({ variables: { id: product._id } });
    setProducts((prevProducts) =>
      prevProducts.filter((p) => p._id !== product._id)
    );
  };

  const editProduct = () => {
    setEditProduct(product);
    navigate("/editProduct");
  };

  return (
    <div className="detailsPage page">
      <h2>{product?.name}</h2>
      <img src={product?.image} />
      <p>{product?.description}</p>
      <div>price: {product?.price}$</div>
      <div>in stock: {product?.quantity}</div>
      <div className="productActionOptions">
        <i className="material-symbols-rounded" onClick={deleteProduct}>
          delete
        </i>
        <i className="material-symbols-rounded" onClick={editProduct}>
          edit
        </i>
      </div>
      <StatusDisplay
        loading={loading}
        loadingMessage={"deleting product..."}
        error={error}
        errorMessage={error && "deletion failed !"}
      ></StatusDisplay>
    </div>
  );
};
