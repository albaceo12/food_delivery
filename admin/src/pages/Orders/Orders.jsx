import React, { useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/admin_assets/assets";
const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [spinnerpage, setSpinnerpage] = useState(false);
  const [changeitem, setChangeitem] = useState("start"); //showing spinnerpage only in start
  const [removeorder, setRemoveorder] = useState("initate"); //showing spinnerpage only in start
  const fetchAllOrders = async () => {
    setSpinnerpage(true);
    try {
      const response = await axios.get(url + "/api/order/list");
      let Data = [...response.data.data].reverse();console.log(Data);
      setOrders(pre=>Data);
    } catch (error) {
      toast.error("Error in display");
    } finally {
      setSpinnerpage(false);
    }
  };
  const statusHandler = async (e, orderId) => {
    setChangeitem((pre) => e.target.value + orderId);
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: e.target.value,
      });
      await fetchAllOrders();
    } catch (error) {
    } finally {
      setChangeitem((pre) => "finished");
    }
  };
  const deleteHandler = async (orderId) => {
    if (removeorder === orderId) return; // Prevent duplicate action
    setRemoveorder((pre) => orderId);
    try {
      const response = await axios.post(url + "/api/order/delorder", {
        orderId,
      });
      await fetchAllOrders();
    } catch (error) {
    } finally {
      setRemoveorder((pre) => "finished");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <div className="order add">
      <h3>Order Page</h3>
      {spinnerpage && changeitem === "start" && removeorder === "initate" ? (
        <div className="spinner-order"></div>
      ) : (
        <div className="order-list">
          {orders.reverse().map((order, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div className="order-address-container">
                <p className="order-item-food">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ", ";
                    }
                  })}
                </p>
                <p className="order-item-name">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div className="order-item-address">
                  <p>{order.address.street + ","}</p>
                  <p>
                    {order.address.city +
                      ", " +
                      order.address.state +
                      ", " +
                      order.address.country +
                      "," +
                      order.address.zipcode}
                  </p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>

              <p className="order-cost">Items: {order.items.length}</p>
              <p className="orderamount">${order.amount}.00</p>
              {changeitem.includes(order._id) ? (
                <div className="changeItemLoading">
                  <span className="loading-spinner-list"></span>
                </div>
              ) : (
                <select
                  onChange={(e) => statusHandler(e, order._id)}
                  value={order.status}
                >
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              )}
              <p onClick={() => deleteHandler(order._id)} className="delorder">
                {removeorder === order._id ? (
                  <span className="loading-spinner-order"></span>
                ) : (
                  "X"
                )}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
