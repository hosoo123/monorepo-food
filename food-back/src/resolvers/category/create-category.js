import { categoryModel } from "../../models/category.js";

export const createCategory = async (req, res) => {
  const newCategory = await categoryModel.create({
    categoryName: req.body.categoryName,
  });
  res.status(201).json({ message: "amjillta", category: newCategory });
};
