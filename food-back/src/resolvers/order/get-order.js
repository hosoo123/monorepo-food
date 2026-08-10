import { OrderModel } from "../../models/order-model.js";

export const getOrder = async (req, res) => {
  const getOrder = await OrderModel.find().populate("user");
  res.status(200).json(getOrder);
};
