"use client";

import { useState } from "react";
import { ShoppingCart, X } from "lucide-react";
import { useCart } from "./cart-context";
import { FoodImage } from "./FoodImage";

const SHIPPING_FEE = 0.99;

interface OrderDetailSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderDetailSheet = ({
  isOpen,
  onClose,
}: OrderDetailSheetProps) => {
  const [activeTab, setActiveTab] = useState<"cart" | "order">("cart");
  const {
    items,
    updateQuantity,
    removeItem,
    itemsTotal,
    address,
    setAddress,
  } = useCart();

  if (!isOpen) return null;

  const total = items.length === 0 ? 0 : itemsTotal + SHIPPING_FEE;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      <div className="fixed inset-0 sm:inset-y-0 sm:right-0 sm:left-auto sm:top-0 h-full w-full sm:w-[535px] bg-[#27272A] text-white z-50 p-4 sm:p-6 shadow-2xl flex flex-col gap-4 sm:gap-6 overflow-y-auto sm:rounded-l-3xl">
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-white" />
            <h2 className="text-xl font-semibold text-white">Order detail</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex bg-white p-1 rounded-full shrink-0">
          <button
            onClick={() => setActiveTab("cart")}
            className={`flex-1 py-2 text-sm font-medium rounded-full transition-all cursor-pointer ${
              activeTab === "cart"
                ? "bg-[#EF4444] text-white"
                : "text-zinc-800 hover:text-black"
            }`}
          >
            Cart
          </button>
          <button
            onClick={() => setActiveTab("order")}
            className={`flex-1 py-2 text-sm font-medium rounded-full transition-all cursor-pointer ${
              activeTab === "order"
                ? "bg-[#EF4444] text-white"
                : "text-zinc-800 hover:text-black"
            }`}
          >
            Order
          </button>
        </div>

        {activeTab === "cart" ? (
          items.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[240px]">
              <div className="w-12 h-12 rounded-full bg-[#F4F4F5] flex items-center justify-center mb-3">
                <ShoppingCart className="w-6 h-6 text-[#EF4444]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Your cart is empty
              </h3>
              <p className="text-xs text-gray-500">
                Hungry? Pick something tasty.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-4 text-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-700 mb-4">
                My cart
              </h3>

              <div className="divide-y divide-dashed divide-zinc-200">
                {items.map((item) => (
                  <div key={item.id} className="py-4 first:pt-0 last:pb-4">
                    <div className="flex gap-3">
                      <FoodImage
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 sm:w-[90px] sm:h-[90px] rounded-xl object-cover shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h4 className="font-semibold text-[#EF4444] text-base leading-tight">
                              {item.name}
                            </h4>
                            {item.description && (
                              <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                                {item.description}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="w-7 h-7 shrink-0 rounded-full border border-[#EF4444] text-[#EF4444] flex items-center justify-center hover:bg-red-50 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-8 h-8 rounded-full border border-zinc-300 text-zinc-800 flex items-center justify-center hover:bg-zinc-100 cursor-pointer"
                            >
                              -
                            </button>
                            <span className="text-sm font-semibold w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-8 h-8 rounded-full border border-zinc-300 text-zinc-800 flex items-center justify-center hover:bg-zinc-100 cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                          <p className="font-semibold text-zinc-900">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-dashed border-zinc-200 pt-4 mt-1">
                <h4 className="text-lg font-semibold text-zinc-700 mb-3">
                  Delivery location
                </h4>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Please share your complete address"
                  className="w-full h-12 rounded-lg border border-zinc-200 px-4 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-zinc-400"
                />
              </div>
            </div>
          )
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center text-gray-500 text-sm">
            No active orders yet.
          </div>
        )}

        <div className="bg-white text-zinc-900 rounded-2xl p-5 space-y-3 mt-auto shrink-0">
          <h4 className="font-semibold text-lg text-zinc-700">Payment info</h4>
          <div className="flex justify-between text-sm text-zinc-500">
            <span>Items</span>
            <span className="font-medium text-zinc-900">
              ${itemsTotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm text-zinc-500">
            <span>Shipping</span>
            <span className="font-medium text-zinc-900">
              {items.length === 0 ? "-" : `${SHIPPING_FEE}$`}
            </span>
          </div>
          <div className="flex justify-between font-semibold text-base text-zinc-900 pt-3 border-t border-dashed border-zinc-200">
            <span>Total</span>
            <span>{items.length === 0 ? "-" : `$${total.toFixed(2)}`}</span>
          </div>
          <button
            disabled={items.length === 0}
            className="w-full bg-[#EF4444] disabled:bg-[#EF4444]/40 text-white disabled:cursor-not-allowed cursor-pointer font-medium py-3.5 rounded-full mt-2 text-sm transition-colors"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};
