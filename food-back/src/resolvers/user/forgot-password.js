import { userModel } from "../../models/user-model.js";

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Имэйл оруулна уу" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Имэйл олдсонгүй" });
    }

    const code = String(Math.floor(100000 + Math.random() * 900000));
    user.resetCode = code;
    user.ttl = new Date(Date.now() + 15 * 60 * 1000);
    user.updatedAt = new Date();
    await user.save();

    console.log(`[forgot-password] ${email} code: ${code}`);

    res.status(200).json({
      message: "Баталгаажуулах код илгээгдлээ",
      // Email service байхгүй тул frontend дээр харуулах/тест хийхэд код буцаана
      code,
    });
  } catch (error) {
    res.status(500).json({ message: "Алдаа гарлаа", error: error.message });
  }
};
