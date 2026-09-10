import { OrderModel } from "../../models/order-model.js";

export const getOrders = async (req, res) => {
  const page = Math.max(1, parseInt(String(req.query.page || "1"), 10) || 1);
  const limit = Math.max(
    1,
    Math.min(100, parseInt(String(req.query.limit || "10"), 10) || 10),
  );
  const skip = (page - 1) * limit;

  const filter = {};
  const { from, to } = req.query;

  if (from || to) {
    filter.createdAt = {};
    if (from) {
      const fromDate = new Date(String(from));
      if (!Number.isNaN(fromDate.getTime())) {
        fromDate.setHours(0, 0, 0, 0);
        filter.createdAt.$gte = fromDate;
      }
    }
    if (to) {
      const toDate = new Date(String(to));
      if (!Number.isNaN(toDate.getTime())) {
        toDate.setHours(23, 59, 59, 999);
        filter.createdAt.$lte = toDate;
      }
    }
    if (Object.keys(filter.createdAt).length === 0) {
      delete filter.createdAt;
    }
  }

  const [orders, total] = await Promise.all([
    OrderModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user")
      .populate({ path: "foodOrderItems.food" }),
    OrderModel.countDocuments(filter),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  res.status(200).json({
    orders,
    total,
    page,
    limit,
    totalPages,
  });
};
