import { OrderModel } from "../../models/order-model.js";

export const deleteOrder = async (req, res) => {
  const { id, ids } = req.body;
  const orderIds = ids?.length ? ids : id ? [id] : [];

  if (!orderIds.length) {
    return res.status(400).json({ message: "id or ids required" });
  }

  const result = await OrderModel.deleteMany({ _id: { $in: orderIds } });
  res.status(200).json({
    message: "deleted",
    deletedCount: result.deletedCount,
  });
};
