import express from "express";
import { getUser } from "../resolvers/user/get-user.js";
import { createUser } from "../resolvers/user/create-user.js";

import { deleteUser } from "../resolvers/user/delete-user.js";
import { updateUser } from "../resolvers/user/update-user.js";

export const userRouter = express.Router();
userRouter.get("/", getUser);
userRouter.post("/", createUser);
userRouter.delete("/", deleteUser);
userRouter.put("/", updateUser);
