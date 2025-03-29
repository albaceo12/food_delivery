import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [spinlist, setSpinlist] = useState(false);
  const [removeitem, setRemoveitem] = useState("initate"); //showing spinnerpage only in start
  const fetchList = async () => {
    if (removeitem === "initate") setSpinlist(true);
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setList(response.data.data);
    } catch (error) {
      toast.error("Error");
    } finally {
      if (removeitem === "initate") setSpinlist(false);
    }
  };
  const removeFood = async (foodId) => {
    if (removeitem === foodId) return; // Prevent duplicate action
    setRemoveitem((pre) => foodId);
    try {
      const response = await axios.post(`${url}/api/food/remove`, {
        id: foodId,
      });
      await fetchList();
      toast.success("Food removed");
    } catch (error) {
      toast.error("Error");
    } finally {
      setRemoveitem((pre) => "finish");
    }
  };
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {spinlist && removeitem === "initate" ? (
          <div className="spinner-order"></div>
        ) : (
          <>
            {" "}
            {list.map((item, index) => {
              return (
                <div key={index} className="list-table-format">
                  <img src={`${url}/images/` + item.image} alt="" />
                  <p className="firstitem">{item.name}</p>
                  <p>{item.category}</p>
                  <p>${item.price}</p>
                  <p
                    onClick={() => removeFood(item._id)}
                    className="cursor lastitem"
                  >
                    {removeitem === item._id ? (
                      <span className="loading-spinner-list"></span>
                    ) : (
                      "X"
                    )}
                  </p>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default List;
