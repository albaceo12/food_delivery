import React, { useContext } from "react";
import "./AppDownload.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";
const AppDownload = () => {
  const { appdownRef } = useContext(StoreContext);
  return (
    <div className="app-download" id="app-download" ref={appdownRef}>
      <p>
        For Better Experience Download <br />
        Tomato App
      </p>
      <div className="app-download-platforms">
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>
    </div>
  );
};

export default AppDownload;
