import productPageStyles from "./ProductPage.module.css";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";

export function ProductPage() {
  let { productId } = useParams();
  let { products, cart, setCart, productBeingViewed, setProductBeingViewed } =
    useOutletContext();
  let processedProductId = productId || productBeingViewed;
  let productInView = products.find(
    (product) => product.id === parseInt(processedProductId)
  );
  function addToCart(product) {
    if (cart.every((cartProduct) => cartProduct.id !== product.id)) {
      let newCart = [...cart];
      newCart.push({ ...product, numInCart: 1 });
      setCart(newCart);
    } else {
      let newCart = cart.map((cartProduct) => {
        if (cartProduct.id === product.id) {
          return { ...cartProduct, numInCart: cartProduct.numInCart + 1 };
        }
        return cartProduct;
      });
      setCart(newCart);
      setProductBeingViewed(processedProductId);
    }
  }
  return (
    <div className={productPageStyles["product-page"]}>
      <h3> {productInView.title}</h3>
      <img src={productInView.image} alt="" />
      <p>
        Rating: {productInView.rating.rate}({productInView.rating.count}{" "}
        reviews)
      </p>
      <p>Price: ${productInView.price}</p>
      <p>{productInView.description}</p>
      <button
        onClick={() => {
          addToCart(productInView);
        }}
      >
        {cart.every((cartProduct) => cartProduct.id !== parseInt(productId))
          ? "Add to cart"
          : "Added to cart"}
      </button>
      <p>category: {productInView.category}</p>
    </div>
  );
}
