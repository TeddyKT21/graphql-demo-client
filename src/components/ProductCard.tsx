import { useNavigate } from "react-router-dom";
import "../styles/components.css";
import { useMutation } from "@apollo/client";
import { DELETE_PRODUCT } from "../graphqlQueries/mutations";
import { StatusDisplay } from "./StatusDisplay";
import { useContext } from "react";
import { ProductContext } from "../context/productContext";
export const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();
  const [deleteFromServer, { data, error, loading }] =
    useMutation(DELETE_PRODUCT);
  const { setProducts, setDetailsProduct,setEditProduct } = useContext(ProductContext)!;

  const deleteProduct = (e:React.MouseEvent) => {
    console.log("deleting product: ", product);
    deleteFromServer({ variables: { id: product._id } });
    setProducts((prevProducts) =>
      prevProducts.filter((p) => p._id !== product._id)
    );
    e.stopPropagation();
  };

  const editProduct = (e: React.MouseEvent) => {
    navigate("/editProduct");
    setEditProduct(product);
    e.stopPropagation();
  };

  const goToDetails = () =>{
    setDetailsProduct(product);
    navigate('/details')
  }
  if (data) return <></>;

  return (
    <div className="productCard" onClick={goToDetails}>
      <h2>{product?.name}</h2>
      <img src={product?.image} />
      <div>price: {product?.price}$</div>
      <StatusDisplay
        loading={loading}
        loadingMessage={"deleting product..."}
        error={error}
        errorMessage={error && "deletion failed !"}
      ></StatusDisplay>
      <div className="productActionOptions">
        <i className="material-symbols-rounded" onClick={deleteProduct}>
          delete
        </i>
        <i className="material-symbols-rounded" onClick={editProduct}>
          edit
        </i>
      </div>
    </div>
  );
};
