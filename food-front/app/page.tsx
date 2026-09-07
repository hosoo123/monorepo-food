"use client";

import { useEffect, useMemo, useState } from "react";
import { Header } from "./_components/header";
import { MenuContainer, CardItem } from "./_components/menuContainer";
import { Footer } from "./_components/footer";
import { apiUrl } from "@/lib/api";
import { LoadingSpinner } from "./_components/LoadingSpinner";

type ApiFood = {
  _id: string;
  foodName: string;
  price: number;
  image?: string;
  ingredients?: string;
  category?: {
    _id: string;
    categoryName: string;
  } | null;
};

type MenuSection = {
  categoryId: string;
  categoryName: string;
  items: CardItem[];
};

export default function Home() {
  const [foods, setFoods] = useState<ApiFood[]>([]);
  const [loading, setLoading] = useState(true);

  const getFoods = async () => {
    try {
      setLoading(true);
      const response = await fetch(apiUrl("/food"));
      if (!response.ok) {
        throw new Error("Food татахад алдаа гарлаа");
      }
      const data = await response.json();
      setFoods(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setFoods([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFoods();
  }, []);

  const sections = useMemo(() => {
    const map = new Map<string, MenuSection>();

    foods.forEach((food) => {
      if (!food.category?._id || !food.category?.categoryName) return;

      const categoryId = food.category._id;
      const categoryName = food.category.categoryName;

      if (!map.has(categoryId)) {
        map.set(categoryId, {
          categoryId,
          categoryName,
          items: [],
        });
      }

      map.get(categoryId)!.items.push({
        id: food._id,
        name: food.foodName,
        price: food.price,
        image: food.image,
        description: food.ingredients || "",
      });
    });

    return Array.from(map.values());
  }, [foods]);

  return (
    <main className="w-full h-full mx-auto flex justify-center flex-col bg-[#404040]">
      <Header />
      <section className="w-full mx-auto">
        <img
          src="/image/BG.svg"
          alt="heroImg"
          className="w-full h-auto max-h-60 sm:max-h-96 lg:max-h-142.5 object-cover"
        />

        <div className="px-4 py-8 sm:px-8 sm:py-12 lg:p-22">
          {loading ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20">
              <LoadingSpinner className="h-8 w-8" />
              <p className="text-sm text-zinc-300">Loading menu...</p>
            </div>
          ) : sections.length === 0 ? (
            <p className="text-center text-zinc-300 py-20">
              No dishes available yet.
            </p>
          ) : (
            sections.map((section) => (
              <MenuContainer
                key={section.categoryId}
                category={section.categoryName}
                items={section.items}
              />
            ))
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
