import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/frontend_assets/assets";
import axios from "axios";
const MyOrders = () => {
  const [data, setData] = useState([]);
  const [spinnertrack, setSpinnertrack] = useState("start");
  const [loadtrack, setLoadtrack] = useState("initate");
  const { url, token } = useContext(StoreContext);
  const fetchOrders = async () => {
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
      setData((prevData) =>
        prevData.map((prevOrder) => {
          const updatedOrder = response.data.data.find(
            (newOrder) => newOrder.status === prevOrder.status
          );
          return updatedOrder ? updatedOrder : prevOrder;
        })
      );

    } catch (error) {
    } finally {
      setSpinnertrack("final");
    }
  };
  const trackbtnfunc = async (orderId) => {
    if (loadtrack === orderId) return; // Prevent duplicate action
    setLoadtrack((pre) => orderId);
    try {
      await fetchOrders();
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
