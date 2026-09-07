import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { categoryRouter } from "./routes/category.js";
import { foodRouter } from "./routes/food.js";
import { orderRouter } from "./routes/order.js";
import { userRouter } from "./routes/user.js";
import "dotenv/config";
const app = express();
app.use(express.json());
app.use(cors());
app.use("/category", categoryRouter);
app.use("/food", foodRouter);
app.use("/order", orderRouter);
app.use("/user", userRouter);
app.use("/category", categoryRouter);

await mongoose.connect(process.env.MONGODB_URL);
console.log("connected");

if (!process.env.VERCEL) {
  const PORT = 8000;

  app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
  });
}
export default app;
