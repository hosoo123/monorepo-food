"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Trash2 } from "lucide-react";
import { StatusBadge, type UiStatus } from "./StatusBadge";

export type OrderFoodItem = {
  name: string;
  quantity: number;
  image?: string;
};

export type AdminOrder = {
  id: string;
  customer: string;
  foods: OrderFoodItem[];
  date: string;
  total: string;
  address: string;
  status: UiStatus;
};

type OrdersTableProps = {
  orders: AdminOrder[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  onToggleAll: (checked: boolean) => void;
  onStatusChange: (id: string, status: UiStatus) => void;
  onDelete: (order: AdminOrder) => void;
  startIndex: number;
};

function FoodItemsDropdown({ foods }: { foods: OrderFoodItem[] }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const foodCount = foods.reduce((sum, f) => sum + f.quantity, 0);
  const panelId = useId();

  const updatePosition = () => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const panelWidth = 240;
    const gap = 6;
    let left = rect.left;
    if (left + panelWidth > window.innerWidth - 8) {
      left = Math.max(8, window.innerWidth - panelWidth - 8);
    }
    setPos({ top: rect.bottom + gap, left });
  };

  useEffect(() => {
    if (!open) return;

    updatePosition();

    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        btnRef.current?.contains(target) ||
        panelRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };

    const onReposition = () => updatePosition();

    document.addEventListener("mousedown", onPointerDown);
    window.addEventListener("scroll", onReposition, true);
    window.addEventListener("resize", onReposition);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("scroll", onReposition, true);
      window.removeEventListener("resize", onReposition);
    };
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 text-[#71717A] hover:text-black"
      >
        {foodCount} foods
        <ChevronDown
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open &&
        foods.length > 0 &&
        createPortal(
          <div
            id={panelId}
            ref={panelRef}
            style={{ top: pos.top, left: pos.left }}
            className="fixed z-100 w-[240px] max-h-[220px] overflow-y-auto rounded-xl border border-[#E4E4E7] bg-white p-2 shadow-lg"
          >
            {foods.map((food, idx) => (
              <div
                key={`${food.name}-${idx}`}
                className="flex items-center gap-2 rounded-lg px-1 py-1.5"
              >
                <div className="h-8 w-8 shrink-0 overflow-hidden rounded-md bg-[#F4F4F5]">
                  {food.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={food.image}
                      alt={food.name}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <span className="min-w-0 flex-1 truncate text-[12px] text-black">
                  {food.name}
                </span>
                <span className="shrink-0 text-[12px] text-[#71717A]">
                  x {food.quantity}
                </span>
              </div>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
}

export const OrdersTable = ({
  orders,
  selectedIds,
  onToggle,
  onToggleAll,
  onStatusChange,
  onDelete,
  startIndex,
}: OrdersTableProps) => {
  const allSelected =
    orders.length > 0 && orders.every((o) => selectedIds.has(o.id));

  return (
    <div className="rounded-lg border border-[#E4E4E7] bg-white">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-[#E4E4E7] text-[12px] text-[#71717A]">
            <th className="w-10 px-4 py-3">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(e) => onToggleAll(e.target.checked)}
                aria-label="Select all"
              />
            </th>
            <th className="px-2 py-3">№</th>
            <th className="px-2 py-3">Customer</th>
            <th className="px-2 py-3">
              <div className="flex items-center gap-1">
                Food <ChevronDown className="h-3 w-3" />
              </div>
            </th>
            <th className="px-2 py-3">
              <div className="flex items-center gap-1">
                Date <ChevronDown className="h-3 w-3" />
              </div>
            </th>
            <th className="px-2 py-3">Total</th>
            <th className="px-2 py-3">Delivery Address</th>
            <th className="px-2 py-3">
              <div className="flex items-center gap-1">
                Delivery state <ChevronDown className="h-3 w-3" />
              </div>
            </th>
            <th className="w-12 px-2 py-3" />
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td
                colSpan={9}
                className="px-4 py-10 text-center text-[13px] text-[#71717A]"
              >
                No orders yet
              </td>
            </tr>
          ) : (
            orders.map((order, i) => (
              <tr
                key={order.id}
                className="border-b border-[#F4F4F5] text-[13px] text-black last:border-0"
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(order.id)}
                    onChange={() => onToggle(order.id)}
                    aria-label={`Select order ${order.id}`}
                  />
                </td>
                <td className="px-2 py-3">{startIndex + i + 1}</td>
                <td className="px-2 py-3 text-[#71717A]">{order.customer}</td>
                <td className="px-2 py-3">
                  <FoodItemsDropdown foods={order.foods} />
                </td>
                <td className="px-2 py-3 text-[#71717A]">{order.date}</td>
                <td className="px-2 py-3">{order.total}</td>
                <td className="max-w-[220px] truncate px-2 py-3 text-[#71717A]">
                  {order.address || "—"}
                </td>
                <td className="px-2 py-3">
                  <StatusBadge
                    status={order.status}
                    onChange={(status) => onStatusChange(order.id, status)}
                  />
                </td>
                <td className="px-2 py-3">
                  <button
                    type="button"
                    onClick={() => onDelete(order)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#A1A1AA] transition-colors hover:bg-[#FEF2F2] hover:text-[#EF4444]"
                    aria-label={`Delete order from ${order.customer}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
