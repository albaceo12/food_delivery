import React, { useContext } from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";
const ExploreMenu = ({ category, setCategory }) => {
  const { menuSectionRef, isFixed, setMargintop, hrexplore } =
    useContext(StoreContext);

  return (
    <>
      <div className="explore-menu" id="explore-menu">
        <h1>Explore our menu</h1>
        <p className="explore-menu-text" ref={hrexplore}>
          Choose from a diverse menu featuring a delectable array of dishes.Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>
      </div>
      <div
        className={`explore-menu-list ${
          isFixed ? "explore-menu-list-fixed" : ""
        }`}
        ref={menuSectionRef}
      >
        {menu_list.map((item, index) => (
          <div
            onClick={() => {
              setMargintop(true);
              setCategory((pre) => {
                hrexplore.current.scrollIntoView({
                  behavior: "smooth",
                });

                return pre === item.menu_name ? "All" : item.menu_name;
              });
            }}
            key={index}
            className="explore-menu-list-item"
          >
            <img
              className={category === item.menu_name ? "active" : ""}
              src={item.menu_image}
              alt=""
            />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr className="explore-menuhr" />
    </>
  );
};

export default ExploreMenu;
