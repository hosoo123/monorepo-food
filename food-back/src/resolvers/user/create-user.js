import bcrypt from "bcrypt";
import { userModel } from "../../models/user-model.js";
import { toPublicUser } from "./auth-utils.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, phone, phoneNumber, address, role } =
      req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Имэйл болон нууц үг шаардлагатай" });
    }

    const existing = await userModel.findOne({ email });
    if (existing) {
      return res
        .status(409)
        .json({ message: "Энэ имэйл аль хэдийн бүртгэлтэй" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber: phoneNumber || phone,
      address,
      role: role || "USER",
    });

    res.status(201).json({
      message: "Account created successfully",
      user: toPublicUser(newUser),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create account", error: error.message });
  }
};
