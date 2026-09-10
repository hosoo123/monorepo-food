"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { apiUrl } from "@/lib/api";
import { getStoredUser } from "@/lib/auth";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
  quantity: number;
};

export type OrderStatus = "PENDING" | "DELIVERED" | "CANCELED";

export type PlacedOrder = {
  id: string;
  totalPrice: number;
  status: OrderStatus;
  items: { name: string; quantity: number; image?: string }[];
  address: string;
  createdAt: string;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  itemsTotal: number;
  address: string;
  setAddress: (address: string) => void;
  orders: PlacedOrder[];
  placeOrder: () => Promise<PlacedOrder | null>;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [address, setAddress] = useState("");
  const [orders, setOrders] = useState<PlacedOrder[]>([]);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">, quantity = 1) => {
      setItems((prev) => {
        const existing = prev.find((cartItem) => cartItem.id === item.id);
        if (existing) {
          return prev.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + quantity }
              : cartItem,
          );
        }
        return [...prev, { ...item, quantity }];
      });
    },
    [],
  );

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.id !== id);
      }
      return prev.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      );
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemsTotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const placeOrder = useCallback(async () => {
    if (items.length === 0 || !address.trim()) return null;

    const user = getStoredUser();
    if (!user?._id) return null;

    const shipping = 0.99;
    const totalPrice = itemsTotal + shipping;
    const trimmedAddress = address.trim();

    try {
      const res = await fetch(apiUrl("/order"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: user._id,
          totalPrice,
          foodOrderItems: items.map((item) => ({
            food: item.id,
            quantity: item.quantity,
            foodName: item.name,
            image: item.image,
          })),
          status: "PENDING",
          address: trimmedAddress,
        }),
      });

      if (!res.ok) return null;

      const data = await res.json();
      const created = data.order;

      const order: PlacedOrder = {
        id: created?._id ?? String(Math.floor(10000 + Math.random() * 90000)),
        totalPrice,
        status: "PENDING",
        items: items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          image: item.image,
        })),
        address: trimmedAddress,
        createdAt: created?.createdAt ?? new Date().toISOString(),
      };

      setOrders((prev) => [order, ...prev]);
      setItems([]);
      return order;
    } catch {
      return null;
    }
  }, [items, address, itemsTotal]);

  const value = useMemo(
    () => ({
      items,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      itemsTotal,
      address,
      setAddress,
      orders,
      placeOrder,
    }),
    [
      items,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      itemsTotal,
      address,
      orders,
      placeOrder,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
