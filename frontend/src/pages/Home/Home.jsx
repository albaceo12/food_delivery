import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDsiplay from "../../components/FoodDsiplay/FoodDsiplay";
import AppDownload from "../../components/AppDownload/AppDownload";
import { StoreContext } from "../../context/StoreContext";
const Home = () => {
  const { menuSectionRef, setIsFixed, appdownRef, margintop } =
    useContext(StoreContext);
  useEffect(() => {
    const handleScroll = () => {
      const menuSection = menuSectionRef.current;
      const appdownSection = appdownRef.current;
      if (menuSection && appdownSection) {
        const menuSectionRet = menuSection.getBoundingClientRect();
        const appdownSectionRet = appdownSection.getBoundingClientRect();
        const appdownpoint =
          appdownSectionRet.top - menuSectionRet.height - 100;

        if (margintop && appdownpoint >= 0 && menuSectionRet.top <= 0) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);

    // // Cleanup the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [margintop]);
  const [category, setCategory] = useState("All");
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDsiplay category={category} />
      <AppDownload />
    </div>
  );
};

export default Home;
