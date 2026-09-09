import jwt from "jsonwebtoken";

export const JWT_SECRET = "naba";

export const createToken = (user) =>
  jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" },
  );

export const toPublicUser = (user) => ({
  _id: user._id,
  name: user.name || "",
  email: user.email,
  role: user.role,
  phoneNumber: user.phoneNumber || "",
  address: user.address || "",
});
