import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../../models/user-model.js";
import { createToken, toPublicUser } from "./auth-utils.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email: email });
  console.log("user", user);

  if (!user) {
    return res
      .status(401)
      .json({ message: "Email эсвэл password буруу байна" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res
      .status(401)
      .json({ message: "Email эсвэл password буруу байна" });
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    "naba",
    { expiresIn: "7d" },
  );

  user.password = undefined;

  res.json({ message: "Амжилттай нэвтэрлээ", token, user });
};
