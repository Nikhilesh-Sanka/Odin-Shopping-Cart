import HomePageStyles from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  let navigate = useNavigate();
  function goToShop() {
    navigate("/shop");
  }
  return (
    <div className={HomePageStyles["home-page"]}>
      <div className={HomePageStyles["header-img"]}>
        <img src="/images/header-img.jpg" alt="" />
      </div>
      <h1>Code Shoppers</h1>
      <div className={HomePageStyles["collage"]}>
        <img src="/images/collage-1.jpeg" alt="" />
        <img src="/images/collage-2.jpg" alt="" />
        <img src="/images/collage-3.jpg" alt="" />
        <img src="/images/collage-4.jpg" alt="" />
      </div>
      <button onClick={goToShop}>Go To Shop</button>
      <footer>
        <p>contact: +90893 84903</p>
        <p>email: code_shoppers.2024@gmail.com</p>
        <img src="/images/footer-image.png" alt="" />
      </footer>
    </div>
  );
}
