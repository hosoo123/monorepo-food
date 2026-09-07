"use client";

import { MenuContainerCard } from "./menuContainerCard";

export type CardItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  description: string;
};

type Props = {
  category: string;
  items: CardItem[];
};

export const MenuContainer = ({ category, items }: Props) => {
  if (items.length === 0) return null;

  return (
    <section className="w-full mx-auto flex flex-col justify-center">
      <h2 className="text-xl sm:text-2xl font-bold text-white pt-8 sm:pt-13.5">
        {category}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
        {items.map((item) => (
          <MenuContainerCard
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            description={item.description}
            image={item.image}
          />
        ))}
      </div>
    </section>
  );
};
