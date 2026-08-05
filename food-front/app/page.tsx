"use client";

import { Header } from "./_components/header";
import { MenuContainer } from "./_components/menuContainer";
import { Footer } from "./_components/footer";
import { FoodModal } from "./_components/foodAddedModal";

const testFood = {
    id: 1,
    name: "Brie Crostini Appetizer",
    price: 12.99,
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    image: "/image/Product Image.svg",
  };
//test

export default function Home() {
  return (
    <main className="w-full h-full mx-auto flex justify-center flex-col bg-[#404040]">
      <Header />
      <section className="w-full mx-auto">
        <img
          src="/image/BG.svg"
          alt="heroImg"
          className="w-full h-auto max-h-142.5 object-cover"
        />
        {/* <FoodModal item={testFood} onClose={() => {}} /> */}
        <div className="p-22">
          <MenuContainer category="Appetizers" />
          <MenuContainer category="Salads" />
          <MenuContainer category="Lunch favorites" />
          <MenuContainer category="Salads" />
        </div>
      </section>
      <Footer />
    </main>
  );
}
