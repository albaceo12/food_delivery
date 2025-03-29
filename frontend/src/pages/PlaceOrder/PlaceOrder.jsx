import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((pre) => ({ ...pre, [name]: value }));
  };
  const placeorder = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent duplicate submission
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    if (orderItems.length > 0) {
      setIsSubmitting(true);
      let orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + 2,
      };

      try {
        let response = await axios.post(url + "/api/order/place", orderData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const { session_url } = response.data;
        window.location.replace(session_url);
      } catch (error) {
        console.log(error);
        toast.error("Something Went Wrong!");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast.info("Cart is empty, Go back to Home !");
    }
  };

  const backtocart = () => {
    navigate("/cart");
  };

  return (
    <>
      <form onSubmit={placeorder} className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input
              name="firstName"
              onChange={onChangeHandler}
              value={data.firstName}
              type="text"
              placeholder="First Name"
              required
            />
            <input
              name="lastName"
              value={data.lastName}
              onChange={onChangeHandler}
              type="text"
              placeholder="Last Name"
              required
            />
          </div>
          <input
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            type="email"
            placeholder="Email address"
            required
          />
          <input
            name="street"
            value={data.street}
            onChange={onChangeHandler}
            type="text"
            placeholder="Street"
            required
          />
          <div className="multi-fields">
            <input
              name="city"
              value={data.city}
              onChange={onChangeHandler}
              type="text"
              placeholder="City"
            />
            <input
              name="state"
              value={data.state}
              onChange={onChangeHandler}
              type="text"
              placeholder="State"
            />
          </div>
          <div className="multi-fields">
            <input
              name="zipcode"
              value={data.zipcode}
              onChange={onChangeHandler}
              type="text"
              placeholder="Zip code"
              required
            />
            <input
              name="country"
              value={data.country}
              onChange={onChangeHandler}
              type="text"
              placeholder="Country"
              required
            />
          </div>
          <input
            name="phone"
            value={data.phone}
            onChange={onChangeHandler}
            type="text"
            placeholder="Phone"
          />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>
                  ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                </b>
              </div>
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Proceeeding..." : "PROCEED TO PAYMENT"}
            </button>
          </div>
        </div>
      </form>
      <div className="divbacktocart">
        <button className="backorder" onClick={backtocart}>
          &larr; <span>Back to Cart</span>
        </button>
      </div>
    </>
  );
};

export default PlaceOrder;
