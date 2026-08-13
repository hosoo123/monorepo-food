"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

interface Category {
  name: string;
  count: number;
}

const categories: Category[] = [
  { name: "All Dishes", count: 112 },
  { name: "Appetizers", count: 6 },
  { name: "Salads", count: 3 },
  { name: "Pizzas", count: 5 },
  { name: "Lunch favorites", count: 5 },
  { name: "Main dishes", count: 5 },
  { name: "Fish & Sea foods", count: 5 },
  { name: "Brunch", count: 5 },
  { name: "Side dish", count: 5 },
  { name: "Desserts", count: 5 },
  { name: "Beverages", count: 5 },
];

export const CategoryFilter = () => {
  const [active, setActive] = useState("All Dishes");

  return (
    <div className="bg-white rounded-2xl p-5">
      <h2 className="text-[15px] font-semibold text-black mb-4">
        Dishes category
      </h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActive(cat.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium border transition-colors ${
              active === cat.name
                ? "border-[#EF4444] text-[#EF4444] bg-white"
                : "border-[#E4E4E7] text-black bg-white hover:bg-[#FAFAFA]"
            }`}
          >
            {cat.name}
            <span
              className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                active === cat.name
                  ? "bg-[#EF4444] text-white"
                  : "bg-black text-white"
              }`}
            >
              {cat.count}
            </span>
          </button>
        ))}
        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-[#EF4444] text-white">
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
