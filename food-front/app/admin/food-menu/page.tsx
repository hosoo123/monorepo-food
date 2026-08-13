import { Sidebar } from "../_features/Sidebar";
import { CategoryFilter } from "./_features/categoryFilter";
import { DishSection } from "./_features/dishSection";

const appetizerDish = {
  image: "https://images.unsplash.com/photo-1541014741259-de529411b96a?w=400",
  name: "Brie Crostini Appetizer",
  price: "$12.99",
  description:
    "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
};

export default function FoodMenuPage() {
  return (
    <div className="flex h-screen bg-[#FAFAFA]">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto flex flex-col gap-6">
        <CategoryFilter />
        <DishSection
          title="Appetizers"
          count={6}
          dishes={Array(6).fill(appetizerDish)}
        />
        <DishSection
          title="Salads"
          count={3}
          dishes={Array(3).fill(appetizerDish)}
        />
      </main>
    </div>
  );
}
