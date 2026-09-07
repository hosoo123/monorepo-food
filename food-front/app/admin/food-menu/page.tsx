"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "../_features/Sidebar";
import { CategoryFilter, CategoryType } from "./_features/categoryFilter";
import { DishSection } from "./_features/dishSection";
import { apiUrl } from "@/lib/api";
import { LoadingSpinner } from "@/app/_components/LoadingSpinner";

export default function FoodMenuPage() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);

  const getCategories = async (showLoader = false) => {
    try {
      if (showLoader) setLoading(true);
      const response = await fetch(apiUrl("/category"));

      if (!response.ok) {
        throw new Error("Category татахад алдаа гарлаа");
      }

      const data = await response.json();
      setCategories(data.categories ?? []);
    } catch (error) {
      console.error(error);
      setCategories([]);
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  useEffect(() => {
    getCategories(true);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#FAFAFA]">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto flex flex-col gap-4 sm:gap-6">
        <CategoryFilter />

        {loading ? (
          <div className="bg-white rounded-2xl p-10 sm:p-16 flex flex-col items-center justify-center gap-3">
            <LoadingSpinner className="h-8 w-8" />
            <p className="text-sm text-zinc-500">Loading categories...</p>
          </div>
        ) : (
          categories.map((category) => (
            <DishSection
              key={category._id}
              category={category}
              getCategory={() => getCategories()}
            />
          ))
        )}
      </main>
    </div>
  );
}
