import { OrderModel } from "../../models/order-model.js";

const ALLOWED = ["PENDING", "CANCELED", "DELIVERED"];

export const updateOrder = async (req, res) => {
  const { id, ids, status } = req.body;

  if (!status || !ALLOWED.includes(status)) {
    return res.status(400).json({ message: "valid status required" });
  }

  const orderIds = ids?.length ? ids : id ? [id] : [];
  if (!orderIds.length) {
    return res.status(400).json({ message: "id or ids required" });
  }

  await OrderModel.updateMany(
    { _id: { $in: orderIds } },
    { status, updatedAt: new Date() },
  );

  const orders = await OrderModel.find({ _id: { $in: orderIds } })
    .populate("user")
    .populate({ path: "foodOrderItems.food" });

  res.status(200).json({ message: "updated", orders });
};
