import { DishCard } from "./dishCard";
import { AddDishCard } from "./AddDishCard";

interface Dish {
  image: string;
  name: string;
  price: string;
  description: string;
}

interface DishSectionProps {
  title: string;
  count: number;
  dishes: Dish[];
}

export const DishSection = ({ title, count, dishes, }: DishSectionProps) => {
  return (
    <div className="bg-white rounded-2xl p-5">
      <h2 className="text-[15px] font-semibold text-black mb-4">
        {title} ({count})
      </h2>
      <div className="grid grid-cols-3 gap-4">
        <AddDishCard categoryName={title} />
        {dishes.map((dish, i) => (
          <DishCard key={i} {...dish} />
        ))}
      </div>
    </div>
  );
};
