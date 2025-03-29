import React, { useEffect, useState } from "react";
import "./Add.css";
import { assets } from "../../assets/admin_assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent multiple submissions
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((pre) => ({ ...pre, [name]: value }));
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent duplicate submission
    setIsSubmitting(true); // Disable further submissions
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", Number(data.price));
      formData.append("category", data.category);
      formData.append("image", image);
      const response = await axios.post(`${url}/api/food/add`, formData);

      setData((pre) => ({
        ...pre,
        name: "",
        description: "",
        price: "",
        category: "Salad",
      }));
      setImage(false);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error submitting:", error);

      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false); // Re-enable the button after the process finishes
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            required
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="write content here"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select
              value={data.category}
              onChange={onChangeHandler}
              name="category"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>
        <button type="submit" className="add-btn" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
};

export default Add;
