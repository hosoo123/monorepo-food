import bcrypt from "bcrypt";
import { userModel } from "../../models/user-model.js";
export const createUser = async (req, res) => {
  try {
    const { email, password, phoneNumber, address, role } = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await userModel.create({
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      role,
    });
    res.status(201).json({ message: "user amjillta uusle", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "aldaa garla", error: error.message });
  }
};
