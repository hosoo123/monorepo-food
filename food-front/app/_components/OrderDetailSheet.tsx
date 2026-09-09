"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Calendar, MapPin, ShoppingCart, X } from "lucide-react";
import { toast } from "sonner";
import { useCart, type PlacedOrder } from "./cart-context";
import { FoodImage } from "./FoodImage";
import { isLoggedIn } from "@/lib/auth";

const SHIPPING_FEE = 0.99;

interface OrderDetailSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onRequireLogin?: () => void;
}

const statusStyles: Record<PlacedOrder["status"], string> = {
  PENDING: "bg-[#EF4444] text-white",
  DELIVERED: "bg-[#E4E4E7] text-[#71717A]",
  CANCELED: "bg-[#E4E4E7] text-[#71717A]",
};

const statusLabel: Record<PlacedOrder["status"], string> = {
  PENDING: "Pending",
  DELIVERED: "Delivered",
  CANCELED: "Canceled",
};

export const OrderDetailSheet = ({
  isOpen,
  onClose,
  onRequireLogin,
}: OrderDetailSheetProps) => {
  const [activeTab, setActiveTab] = useState<"cart" | "order">("cart");
  const [addressError, setAddressError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const {
    items,
    updateQuantity,
    removeItem,
    itemsTotal,
    address,
    setAddress,
    orders,
    placeOrder,
  } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setActiveTab("cart");
    } else {
      setShowSuccess(false);
      setAddressError(false);
    }
  }, [isOpen]);

  const total = items.length === 0 ? 0 : itemsTotal + SHIPPING_FEE;

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Сагс хоосон байна");
      return;
    }

    if (!address.trim()) {
      setAddressError(true);
      toast.error("Please complete your address");
      return;
    }

    setAddressError(false);

    if (!isLoggedIn()) {
      toast.error("Эхлээд нэвтэрнэ үү");
      onRequireLogin?.();
      return;
    }

    const order = placeOrder();
    if (!order) {
      toast.error("Захиалга үүсгэж чадсангүй");
      return;
    }

    setShowSuccess(true);
  };

  const handleBackToHome = () => {
    setShowSuccess(false);
    setActiveTab("order");
  };

  const formatDate = (iso: string) => {
    const date = new Date(iso);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}/${m}/${d}`;
  };

  const successModal =
    mounted &&
    showSuccess &&
    createPortal(
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60" onClick={handleBackToHome} />
        <div className="relative bg-white rounded-2xl p-8 max-w-[420px] w-full shadow-2xl text-center flex flex-col items-center">
          <button
            type="button"
            onClick={handleBackToHome}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-zinc-500 hover:bg-zinc-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <h2 className="text-xl font-semibold text-gray-900 mb-6 mt-2 px-4">
            Your order has been successfully placed !
          </h2>

          <img
            src="/icons/illustration.svg"
            alt="Order success"
            className="w-48 h-auto mb-8"
          />

          <button
            type="button"
            onClick={handleBackToHome}
            className="w-full bg-[#F4F4F5] hover:bg-[#E4E4E7] text-zinc-900 font-medium py-3 rounded-full text-sm transition-colors cursor-pointer"
          >
            Back to home
          </button>
        </div>
      </div>,
      document.body,
    );

  if (!isOpen) {
    return <>{successModal}</>;
  }

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
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (e.target.value.trim()) setAddressError(false);
                  }}
                  placeholder="Please complete your address"
                  className={`w-full h-12 rounded-lg border px-4 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none ${
                    addressError
                      ? "border-[#EF4444] focus:border-[#EF4444]"
                      : "border-zinc-200 focus:border-zinc-400"
                  }`}
                />
                {addressError && (
                  <p className="mt-2 text-sm text-[#EF4444]">
                    Please complete your address
                  </p>
                )}
              </div>
            </div>
          )
        ) : (
          <div className="bg-white rounded-2xl p-4 text-zinc-900 flex-1 overflow-y-auto">
            <h3 className="text-lg font-semibold text-zinc-700 mb-4">
              Order history
            </h3>

            {orders.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-10">
                No orders yet.
              </p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-zinc-200 rounded-xl p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-zinc-900">
                          ${order.totalPrice.toFixed(2)}
                        </p>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          #{order.id}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[order.status]}`}
                      >
                        {statusLabel[order.status]}
                      </span>
                    </div>

                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <p
                          key={`${order.id}-${item.name}-${index}`}
                          className="text-sm text-zinc-700"
                        >
                          {item.name} x {item.quantity}
                        </p>
                      ))}
                    </div>

                    <div className="flex flex-col gap-1.5 text-xs text-zinc-500 pt-1 border-t border-dashed border-zinc-200">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        <span>{formatDate(order.createdAt)}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{order.address}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "cart" && (
          <div className="bg-white text-zinc-900 rounded-2xl p-5 space-y-3 mt-auto shrink-0">
            <h4 className="font-semibold text-lg text-zinc-700">Payment info</h4>
            <div className="flex justify-between text-sm text-zinc-500">
              <span>Items</span>
              <span className="font-medium text-zinc-900">
                {items.length === 0 ? "-" : `$${itemsTotal.toFixed(2)}`}
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
              type="button"
              disabled={items.length === 0}
              onClick={handleCheckout}
              className="w-full bg-[#EF4444] disabled:bg-[#EF4444]/40 text-white disabled:cursor-not-allowed cursor-pointer font-medium py-3.5 rounded-full mt-2 text-sm transition-colors"
            >
              Checkout
            </button>
          </div>
        )}
      </div>

      {successModal}
    </>
  );
};
