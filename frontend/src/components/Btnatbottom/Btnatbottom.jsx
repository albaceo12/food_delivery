import react, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Btnatbottom.css"; // Add styles
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/frontend_assets/assets";

const Btnatbottom = () => {
  const { cartItems } = useContext(StoreContext);
  const itemsnum = Object.values(cartItems);
  const allZero = itemsnum.every((item) => item === 0);

  const navigate = useNavigate();

  const goToCart = () => {
    navigate("/cart");
  };

  return (
    <div className={`${allZero ? "none" : "show"} fixed-cart-button-container`}>
      <button className="fixed-cart-button" onClick={goToCart}>
        <img src={assets.basket_wicon} alt="" /> <span>Go to Cart</span>
      </button>
    </div>
  );
};

export default Btnatbottom;
