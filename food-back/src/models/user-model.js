import mongoose, { SchemaType } from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  password: String,
  phoneNumber: String,
  address: String,
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  orderedFoods: Schema.Types.ObjectId,
  ttl: Date,
  isVerified: Boolean,
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

export const userModel = mongoose.model("user", UserSchema);
