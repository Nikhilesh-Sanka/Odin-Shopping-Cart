import shopStyles from "./Shop.module.css";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useState } from "react";

export function Shop() {
  let { category, setCategory, products, cart, setCart } = useOutletContext();
  let [searchedString, setSearchedString] = useState("");
  function changeCategory(categoryName) {
    setSearchedString("");
    document.querySelector("#shop-search").value = "";
    setCategory(categoryName);
    document.querySelectorAll(".shop p").forEach((category) => {
      category.className = "";
    });
  }
  function isCategoryChosen(categoryBeingProcessed) {
    return category === categoryBeingProcessed ? "chosen-category" : "";
  }
  return (
    <div className={shopStyles["shop"] + " shop"}>
      <div className={shopStyles["search"]}>
        <input
          type="text"
          id="shop-search"
          placeholder="eg.shirts"
          onFocus={(e) => {
            e.target.addEventListener("keypress", (e) => {
              if (e.which === 13) {
                setSearchedString(document.querySelector("#shop-search").value);
                document.querySelector("#shop-search").blur();
              }
            });
          }}
        />
        <button
          onClick={() => {
            setSearchedString(document.querySelector("#shop-search").value);
            document.querySelector("#shop-search").blur();
          }}
        >
          Search
        </button>
      </div>
      <div className={shopStyles["category"]}>
        <p
          className={isCategoryChosen("all")}
          onClick={(e) => {
            changeCategory("all");
            e.target.className = "chosen-category";
          }}
        >
          All
        </p>
        <p
          className={isCategoryChosen("men's clothing")}
          onClick={(e) => {
            changeCategory("men's clothing");
            e.target.className = "chosen-category";
          }}
        >
          men&#39;s clothing
        </p>
        <p
          className={isCategoryChosen("women's clothing")}
          onClick={(e) => {
            changeCategory("women's clothing");
            e.target.className = "chosen-category";
          }}
        >
          women&#39; clothing
        </p>
        <p
          className={isCategoryChosen("electronics")}
          onClick={(e) => {
            changeCategory("electronics");
            e.target.className = "chosen-category";
          }}
        >
          electronics
        </p>
        <p
          className={isCategoryChosen("jewelery")}
          onClick={(e) => {
            changeCategory("jewelery");
            e.target.className = "chosen-category";
          }}
        >
          jewelery
        </p>
      </div>
      <div className={shopStyles["products"]}>
        <Products
          category={category}
          searchedString={searchedString}
          products={products}
          cart={cart}
          setCart={setCart}
        />
      </div>
    </div>
  );
}

function Products({ category, searchedString, products, cart, setCart }) {
  let navigate = useNavigate();
  let filteredProducts;
  if (category === "all") {
    filteredProducts = products;
  } else {
    filteredProducts = products.filter(
      (product) => product.category === category
    );
  }
  if (searchedString !== null) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.title.toLowerCase().includes(searchedString.toLowerCase());
    });
  }
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
    }
  }
  function openProductPage(product) {
    navigate(`/product/${product.id}`);
  }
  return (
    <>
      {filteredProducts.map((product) => {
        return (
          <div
            className={shopStyles["product"]}
            key={product.id}
            onClick={() => {
              openProductPage(product);
            }}
          >
            <img src={product.image} alt="" />
            <div className={shopStyles["product"]}>
              <p>
                Rating:{" "}
                {`${product.rating.rate}(${product.rating.count} reviews)`}
              </p>
              <p>{product.title}</p>
              <p>Price: ${product.price}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
              >
                {cart.every((cartProduct) => cartProduct.id !== product.id)
                  ? "Add to cart"
                  : "Added to cart"}
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
