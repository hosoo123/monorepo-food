import { OrderModel } from "../../models/order-model.js";

export const updateOrder = async (req, res) => {
  const body = req.body;
  const updatedUser = await OrderModel.findByIdAndUpdate(body.id, {
    email: body.email,
    password: body.password,
    phoneNumber: body.phoneNumber,
    address: body.address,
    role: body.role,
  });
  res.status(201).json(updatedUser);
};
