import bcrypt from "bcrypt";
import { userModel } from "../../models/user-model.js";

export const resetPassword = async (req, res) => {
  try {
    const { email, code, password } = req.body;

    if (!email || !code || !password) {
      return res
        .status(400)
        .json({ message: "Имэйл, код, шинэ нууц үг шаардлагатай" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Имэйл олдсонгүй" });
    }

    if (!user.resetCode || user.resetCode !== String(code)) {
      return res.status(400).json({ message: "Баталгаажуулах код буруу" });
    }

    if (user.ttl && new Date(user.ttl) < new Date()) {
      return res.status(400).json({ message: "Кодын хугацаа дууссан" });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetCode = undefined;
    user.ttl = undefined;
    user.updatedAt = new Date();
    await user.save();

    res.status(200).json({ message: "Нууц үг амжилттай шинэчлэгдлээ" });
  } catch (error) {
    res.status(500).json({ message: "Алдаа гарлаа", error: error.message });
  }
};
