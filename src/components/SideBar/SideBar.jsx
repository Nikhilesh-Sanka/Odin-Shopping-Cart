import sideBarStyles from "./SideBar.module.css";
import { useNavigate } from "react-router-dom";

export function SideBar() {
  let navigate = useNavigate();
  function navigateToPage(page) {
    navigate(`/${page}`);
  }
  return (
    <div className={sideBarStyles["side-bar"]}>
      <div className={sideBarStyles["icon"]}>
        <img src="/images/logo.jpg" />
        <h2>Code Shoppers</h2>
      </div>
      <div
        onClick={() => {
          navigateToPage("homepage");
        }}
      >
        <img src="/images/home-icon.svg" />
        <p>Home Page</p>
      </div>
      <div
        onClick={() => {
          navigateToPage("shop");
        }}
      >
        <img src="/images/shop-icon.svg" />
        <p>Shop</p>
      </div>
      <div
        onClick={() => {
          navigateToPage("cart");
        }}
      >
        <img src="/images/cart-icon.svg" />
        <p>Cart</p>
      </div>
    </div>
  );
}
