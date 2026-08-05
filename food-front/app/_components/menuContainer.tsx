import { MenuContainerCard } from "./menuContainerCard";

type Props = {
  category: string;
};

export type CardItem = {
  id: number;
  name: string;
  price: number;
  image?: string;
  description: string;
};
const allCards: Record<string, CardItem[]> = {
  Appetizers: [
    {
      id: 1,
      name: "Finger Food",
      price: 19.99,
      description: "Fluffy pancakes stacked with fruits.",
    },
    {
      id: 2,
      name: "Spring Rolls",
      price: 12.99,
      description: "Crispy spring rolls with vegetables.",
    },
    {
      id: 3,
      name: "Chicken Wings",
      price: 15.99,
      description: "Juicy wings with dipping sauce.",
    },
    {
      id: 4,
      name: "Nachos",
      price: 10.99,
      description: "Tortilla chips with melted cheese.",
    },
    {
      id: 5,
      name: "Garlic Bread",
      price: 8.99,
      description: "Toasted bread with garlic butter.",
    },
    {
      id: 6,
      name: "Onion Rings",
      price: 9.99,
      description: "Golden fried onion rings.",
    },
  ],
  Salads: [
    {
      id: 1,
      name: "Caesar Salad",
      price: 11.99,
      description: "Romaine lettuce with caesar dressing.",
    },
    {
      id: 2,
      name: "Greek Salad",
      price: 10.99,
      description: "Fresh vegetables with feta cheese.",
    },
    {
      id: 3,
      name: "Garden Salad",
      price: 9.99,
      description: "Mixed greens with vinaigrette.",
    },
  ],
  "Lunch favorites": [
    {
      id: 1,
      name: "Club Sandwich",
      price: 14.99,
      description: "Triple decker with turkey and bacon.",
    },
    {
      id: 2,
      name: "Burger",
      price: 13.99,
      description: "Juicy beef patty with fresh toppings.",
    },
    {
      id: 3,
      name: "Fish & Chips",
      price: 16.99,
      description: "Crispy fish with golden fries.",
    },
    {
      id: 4,
      name: "Pasta",
      price: 12.99,
      description: "Creamy pasta with parmesan cheese.",
    },
    {
      id: 5,
      name: "Pizza Slice",
      price: 11.99,
      description: "Classic margherita with fresh basil.",
    },
  ],
};

export const MenuContainer = ({ category }: Props) => {
  const cards = allCards[category] || [];
  return (
    <section className="w-full mx-auto flex flex-col justify-center">
      <h2 className="text-2xl font-bold text-white pt-13.5">{category}</h2>
      <div className="flex flex-wrap gap-4 mt-4">
        {cards.map((item) => (
          <MenuContainerCard
            key={item.id}
            name={item.name}
            price={item.price}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
};
