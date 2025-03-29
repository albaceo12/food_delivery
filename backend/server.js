import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
// import dotenv from "dotenv";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
// import { config } from "dotenv";
// config();
// console.log(process.env.JWT_SECRET);
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("uncaugh exception occured! shutting down");
  process.exit(1);
});
const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/food", foodRouter);
app.use("/images/", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

const server = app.listen(process.env.PORT, () => {
  console.log(`server started on http://localhost:${process.env.PORT}`);
});
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("unhandled rejection occured!! shutting down");
  //  process.exit(1)
  server.close(() => {
    process.exit(1);
  });
});
//
