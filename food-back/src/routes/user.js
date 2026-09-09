import express from "express";
import { getUser } from "../resolvers/user/get-user.js";
import { createUser } from "../resolvers/user/create-user.js";
import { loginUser } from "../resolvers/user/login-user.js";
import { forgotPassword } from "../resolvers/user/forgot-password.js";
import { resetPassword } from "../resolvers/user/reset-password.js";
import { deleteUser } from "../resolvers/user/delete-user.js";
import { updateUser } from "../resolvers/user/update-user.js";

export const userRouter = express.Router();

userRouter.get("/", getUser);
userRouter.post("/", createUser);
userRouter.post("/signup", createUser);
userRouter.post("/login", loginUser);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password", resetPassword);
userRouter.delete("/", deleteUser);
userRouter.put("/", updateUser);
