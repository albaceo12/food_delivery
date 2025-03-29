import { createContext, useState, useRef, useEffect } from "react";
// import { food_list } from "../assets/frontend_assets/assets";
import axios from "axios";
export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "https://food-del-backend-0e27.onrender.com";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [isFixed, setIsFixed] = useState(false);
  const [margintop, setMargintop] = useState(false);
  const menuSectionRef = useRef(null);
  const appdownRef = useRef(null);
  const hrexplore = useRef(null);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((pre) => ({ ...pre, [itemId]: 1 }));
    } else {
      setCartItems((pre) => ({ ...pre, [itemId]: pre[itemId] + 1 }));
    }
    if (token) {
      const res = await axios.post(
        url + "/api/cart/add",
        { itemId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(res);
    }
  };
  const removeFromCart = async (itemId) => {
    setCartItems((pre) => ({ ...pre, [itemId]: pre[itemId] - 1 }));
    if (token) {
      const res = await axios.post(
        url + "/api/cart/remove",
        { itemId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(res);
    }
  };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };
  const contextValue = {
    food_list,
    margintop,
    setMargintop,
    cartItems,
    setCartItems,
    isFixed,
    setIsFixed,
    addToCart,
    removeFromCart,
    menuSectionRef,
    appdownRef,
    hrexplore,
    setMargintop,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };
  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };
  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setCartItems(response.data.cartData);
  };
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
