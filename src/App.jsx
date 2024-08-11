import { SideBar } from "./components/SideBar/SideBar.jsx";
import appStyles from "./App.module.css";
import { Outlet, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export function App() {
  let [products, setProducts] = useState([]);
  let [cart, setCart] = useState([]);
  let [categoryBeingViewed, setCategoryBeingViewed] = useState("all");
  useEffect(() => {
    async function getProducts() {
      let fetchedData = await fetch("https://fakestoreapi.com/products");
      let products = await fetchedData.json();
      return products;
    }
    getProducts().then((fetchedProducts) => {
      fetchedProducts = fetchedProducts.map((product) => {
        return { ...product };
      });
      setProducts(fetchedProducts);
    });
  }, []);
  function getProduct(productId) {
    return products.find((product) => product.id === productId);
  }
  return (
    <div className={appStyles["app"]}>
      <SideBar />
      <div className={appStyles["main-display"]}>
        <Outlet
          context={{
            category: categoryBeingViewed,
            setCategory: setCategoryBeingViewed,
            products: products,
            cart: cart,
            setCart: setCart,
          }}
        />
      </div>
    </div>
  );
}
