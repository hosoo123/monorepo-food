"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Category {
  categoryName: string;
  // _id: String;
  count: number;
}

const categories: Category[] = [
  { categoryName: "All Dishes", count: 112 },
  { categoryName: "Appetizers", count: 6 },
  { categoryName: "Salads", count: 3 },
  { categoryName: "Pizzas", count: 5 },
  { categoryName: "Lunch favorites", count: 5 },
  { categoryName: "Main dishes", count: 5 },
  { categoryName: "Fish & Sea foods", count: 5 },
  { categoryName: "Brunch", count: 5 },
  { categoryName: "Side dish", count: 5 },
  { categoryName: "Desserts", count: 5 },
  { categoryName: "Beverages", count: 5 },
];

export const CategoryFilter = () => {
  const [active, setActive] = useState("All Dishes");
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const getCategory = async () => {
    const res = await fetch("http://localhost:8000/category");
    const data = await res.json();
    setCategories(data);
  };
  const createCategory = async () => {
    const res = await fetch("http://localhost:8000/category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoryName: "New Category", count: 0 }),
    });
    const data = await res.json();
    console.log(data);
  };

  console.log("category", categories);

  return (
    <div className="bg-white rounded-2xl p-5">
      <h2 className="text-[15px] font-semibold text-black mb-4">
        Dishes category
      </h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.categoryName}
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
              {cat.count}
            </span>
          </button>
        ))}

        <Dialog>
          <DialogTrigger>
            {" "}
            <button
              onClick={() => {
                createCategory();
              }}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#EF4444] text-white"
            >
              <Plus className="w-4 h-4" />
            </button>
          </DialogTrigger>
          <DialogContent>
            <Input
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />  
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
