import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FoodSchema = new Schema(
  {
    foodName: String,
    price: String,
    image: String,
    ingredients: String,
    category: Schema.Types.ObjectId,
  },
  { 
    timestamps: true,
  },
);

export const foodModel = mongoose.model("food", FoodSchema);
