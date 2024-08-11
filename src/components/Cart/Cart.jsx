import CartStyles from "./Cart.module.css";
import { useOutletContext, useNavigate } from "react-router-dom";

export function Cart() {
  let { cart, setCart } = useOutletContext();
  let navigate = useNavigate();
  let totalPrice = cart.reduce((a, b) => a + b.price * b.numInCart, 0);
  function changeCount(product, newValue) {
    let processedNewValue = newValue < 0 ? 0 : newValue;
    let newCart = cart.map((cartProduct) => {
      if (cartProduct.id === product.id) {
        return { ...cartProduct, numInCart: parseInt(processedNewValue) };
      }
      return cartProduct;
    });
    setCart(newCart);
  }
  function removeFromCart(product) {
    let newCart = cart.filter((cartProduct) => cartProduct.id !== product.id);
    setCart(newCart);
  }
  function clearCart() {
    setCart([]);
  }
  function checkoutCart() {
    if (totalPrice > 0) {
      alert(`You have bought $${totalPrice} worth of goods`);
    }
  }
  return (
    <div className={CartStyles["cart"]}>
      <h2>Cart</h2>
      {cart.map((cartProduct) => {
        return (
          <div className={CartStyles["cart-product"]} key={cartProduct.id}>
            <img
              src={cartProduct.image}
              onClick={() => navigate(`/product/${cartProduct.id}`)}
            />
            <p>Price: ${cartProduct.price}</p>
            <div>
              <label>
                Count:
                <input
                  type="number"
                  value={cartProduct.numInCart}
                  onChange={(e) => changeCount(cartProduct, e.target.value)}
                />
              </label>
            </div>
            <button onClick={() => removeFromCart(cartProduct)}>
              Remove From Cart
            </button>
          </div>
        );
      })}
      <p>Total Price: ${totalPrice}</p>
      <div>
        <button onClick={clearCart}>Clear Cart</button>
        <button onClick={checkoutCart}>Checkout Cart</button>
      </div>
    </div>
  );
}
