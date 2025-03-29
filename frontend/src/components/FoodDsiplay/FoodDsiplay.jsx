import React, { useContext } from "react";
import "./FoodDsiplay.css";
// import { food_list } from "../../assets/frontend_assets/assets";
import FoodItem from "../FoodItem/FoodItem";
import { StoreContext } from "../../context/StoreContext";
const FoodDsiplay = ({ category }) => {
  const { margintop, food_list } = useContext(StoreContext);
  return (
    <div className="food-display" id="food-display">
      <h2 className={`${margintop ? "margintop" : ""}`}>Top dishes near you</h2>
      <div className={`food-display-list`}>
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDsiplay;
