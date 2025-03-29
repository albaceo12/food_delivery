import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
  },
  { timestamps: true, minimize: false }
);
// timestamps for -> showing created at and updated at time in each document
// minimize for -> By default, Mongoose minimizes objects, meaning it will remove properties that are empty when a document is saved.
const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
