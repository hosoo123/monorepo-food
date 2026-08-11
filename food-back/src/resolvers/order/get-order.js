import { OrderModel } from "../../models/order-model.js";

export const getOrders = async (req, res) => {
  const getOrder = await OrderModel.find().populate("user").populate({
    path: "foodOrderItems.food",
  });
  res.status(200).json(getOrder);
};
