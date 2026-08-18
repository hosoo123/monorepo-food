"use client";

import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface CategoryType {
  categoryName: string;
  _id: string;
  foodCount: number;
}

export const CategoryFilter = () => {
  const [active, setActive] = useState("All Dishes");
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getCategory = async () => {
    const res = await fetch("http://localhost:8000/category");
    const data = await res.json();
    setCategories(data.categories);
    console.log("datata", data);
  };

  const createCategory = async () => {
    const res = await fetch("http://localhost:8000/category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoryName: categoryName, count: 0 }),
    });
    const data = await res.json();
    getCategory();
    setCategoryName("");
    setIsDialogOpen(false);
  };
  const deleteCategory = async (categoryId: string) => {
    const res = await fetch("http://localhost:8000/category", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: categoryId, count: 0 }),
    });
    const data = await res.json();
    getCategory();
    setCategoryName("");
    setIsDialogOpen(false);
  };
  useEffect(() => {
    getCategory();
  }, []);
  const categoryList = Array.isArray(categories) ? categories : [];
  const totalCount = (Array.isArray(categories) ? categories : []).reduce(
    (sum, cat) => sum + cat.foodCount,
    0,
  );

  const allCategories: CategoryType[] = [
    { categoryName: "All Dishes", _id: "all", foodCount: totalCount },
    ...categoryList,
  ];

  return (
    <div className="bg-white rounded-2xl p-5">
      <h2 className="text-[15px] font-semibold text-black mb-4">
        Dishes category
      </h2>
      <div className="flex flex-wrap gap-2">
        {allCategories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => setActive(cat.categoryName)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium border transition-colors ${
              active === cat.categoryName
                ? "border-[#EF4444] text-[#EF4444] bg-white"
                : "border-[#E4E4E7] text-black bg-white hover:bg-[#FAFAFA]"
            }`}
          >
            {cat.categoryName}
            <span
              className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                active === cat.categoryName
                  ? "bg-[#EF4444] text-white"
                  : "bg-black text-white"
              }`}
            >
              {cat.foodCount}
            </span>
            <div
              onClick={(e) => {
                e.stopPropagation();
                deleteCategory(cat._id);
              }}
              className={`flex items-center gap-2 px-2 py-1 rounded-full text-[13px] font-medium border transition-colors ${
                "All Dishes" === cat.categoryName ? "hidden" : ""
              }`}
            >
              <X width={12} height={12} />
            </div>
          </button>
        ))}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger>
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#EF4444] text-white cursor-pointer">
              <Plus className="w-4 h-4" />
            </div>
          </DialogTrigger>
          <DialogContent>
            <div className="flex flex-col h-67 w-full justify-between gap-4">
              <h1 className="text-lg font-bold">Add New Category</h1>
              <div className="flex gap-3 flex-col font-bold">
                {" "}
                <p>Category name</p>
                <Input
                  placeholder="Category Name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>
              <button
                className="ml-auto border-[#EF4444] cursor-pointer text-white bg-black rounded-full px-4 py-2 font-bold flex items-center justify-center"
                onClick={createCategory}
              >
                Add category
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
