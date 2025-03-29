import foodModel from "../models/foodModel.js";
import fs from "fs";

const addFood = async (req, res) => {
  let img_filename = req.file.filename;
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: img_filename,
    category: req.body.category,
  });
  try {
    await food.save();
    res.status(201).json({ success: true, message: "food added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find();
    res.status(200).json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});
    await foodModel.findByIdAndDelete(req.body.id);
    res.status(204).json({ success: true, message: "food removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export { addFood, listFood, removeFood };
