"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AllDishes } from "./allDIshes";
import { toast } from "sonner";
import { apiUrl } from "@/lib/api";
import { LoadingSpinner } from "@/app/_components/LoadingSpinner";

export type CategoryType = {
  categoryName: string;
  _id: string;
  foodCount: number;
};

export const CategoryFilter = () => {
  const [active, setActive] = useState("All Dishes");
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [totalFoods, setTotalFoods] = useState(0);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const getCategory = async (showLoader = false) => {
    try {
      if (showLoader) setLoading(true);
      const res = await fetch(apiUrl("/category"));
      const data = await res.json();
      setCategories(data.categories);
      setTotalFoods(data.totalFoods);
    } catch (error) {
      console.error(error);
      setCategories([]);
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  const createCategory = async () => {
    if (!categoryName.trim() || creating) return;

    try {
      setCreating(true);
      const res = await fetch(apiUrl("/category"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryName,
          count: 0,
        }),
      });

      if (!res.ok) {
        throw new Error("Category нэмэхэд алдаа гарлаа");
      }

      await res.json();
      await getCategory();

      toast.success("New Category is being added to the menu");

      setCategoryName("");
      setIsDialogOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add new category");
    } finally {
      setCreating(false);
    }
  };

  const deleteCategory = async (categoryId: string) => {
    if (deletingId) return;

    try {
      setDeletingId(categoryId);
      const res = await fetch(apiUrl("/category"), {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: categoryId, count: 0 }),
      });
      if (!res.ok) {
        throw new Error("Failed to delete category");
      }

      await res.json();
      await getCategory();
      toast.success("Category has been deleted");

      setCategoryName("");
      setIsDialogOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete category");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    getCategory(true);
  }, []);

  const categoryList = Array.isArray(categories) ? categories : [];
  const totalCount = categoryList.reduce((sum, cat) => sum + cat.foodCount, 0);

  const allCategories: CategoryType[] = [
    { categoryName: "All Dishes", _id: "all", foodCount: totalCount },
    ...categoryList,
  ];

  return (
    <div className="bg-white rounded-2xl p-5">
      <h2 className="text-[15px] font-semibold text-black mb-4">
        Dishes category
      </h2>

      {loading ? (
        <div className="flex items-center gap-2 py-2">
          <LoadingSpinner className="h-5 w-5" />
          <span className="text-sm text-zinc-500">Loading...</span>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {allCategories.map((cat) => (
            <AllDishes
              key={cat._id}
              cat={cat}
              active={active}
              setActive={setActive}
              deleteCategory={deleteCategory}
              deleting={deletingId === cat._id}
            />
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
                  <p>Category name</p>
                  <Input
                    placeholder="Category Name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    disabled={creating}
                  />
                </div>
                <button
                  disabled={creating || !categoryName.trim()}
                  className="ml-auto border-[#EF4444] cursor-pointer text-white bg-black rounded-full px-4 py-2 font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={createCategory}
                >
                  {creating && <LoadingSpinner className="h-4 w-4" />}
                  {creating ? "Adding..." : "Add category"}
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};
