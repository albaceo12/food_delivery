import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
const MyOrders = () => {
  const [data, setData] = useState([]);
  const [spinnertrack, setSpinnertrack] = useState("start");
  const [loadtrack, setLoadtrack] = useState("initate");
  const { url, token } = useContext(StoreContext);

  const fetchOrders = async (orderId = null) => {
    if (loadtrack === "initate") setSpinnertrack("processing");
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!orderId) {
        // 🚀 Case 1: Normal fetch (useEffect) → Load all orders
        setData(response.data.data);
      } else {
        // 🚀 Case 2: Tracking an order → Remove if missing
        setData((prevData) => {
          const updatedOrders = response.data.data;

          // Check if the tracked order still exists in the new data
          const orderStillExists = updatedOrders.some(
            (order) => order._id === orderId
          );

          if (!orderStillExists) {
            // 🚨 Order was removed from the database → remove it from UI
            return prevData.filter((order) => order._id !== orderId);
          } else {
            // 🔄 Order still exists → Update only that order
            return prevData.map((prevOrder) =>
              prevOrder._id === orderId
                ? {
                    ...prevOrder,
                    ...updatedOrders.find((order) => order._id === orderId),
                  }
                : prevOrder
            );
          }
        });
      }
    } catch (error) {
      toast.error("Error in displaying orders");
    } finally {
      setSpinnertrack("final");
    }
  };
  const trackbtnfunc = async (orderId) => {
    if (loadtrack === orderId) return; // Prevent duplicate action
    setLoadtrack((pre) => orderId);
    try {
      await fetchOrders(orderId);
    } catch (error) {
    } finally {
      setLoadtrack("complete");
    }
  };
  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);
  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {spinnertrack === "processing" && loadtrack === "initate" ? (
          <div className="spinner-order"></div>
        ) : spinnertrack === "final" && data.length === 0 ? (
          <p className="no-order-p">You havent ordered anything yet !</p>
        ) : (
          data?.map((order, index) => {
            return (
              <div key={index} className="my-orders-order">
                <img src={assets.parcel_icon} alt="" />
                <p>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ", ";
                    }
                  })}
                </p>
                <p>${order.amount}.00</p>
                <p>Items: {order.items.length}</p>
                <p>
                  <span>&#x25cf; </span>
                  <b>{order.status}</b>
                </p>
                <button
                  onClick={() => trackbtnfunc(order._id)}
                  disabled={loadtrack === order._id}
                >
                  {loadtrack === order._id ? "Tracking..." : "Track Order"}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyOrders;
