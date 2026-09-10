"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";

export type UiStatus = "Pending" | "Delivered" | "Cancelled";

export const statusStyles: Record<UiStatus, string> = {
  Pending: "border-[#EF4444] text-[#EF4444] bg-[#FEF2F2]",
  Delivered: "border-[#22C55E] text-[#22C55E] bg-[#F0FDF4]",
  Cancelled: "border-[#A1A1AA] text-[#71717A] bg-[#F4F4F5]",
};

const OPTIONS: UiStatus[] = ["Delivered", "Pending", "Cancelled"];

type StatusBadgeProps = {
  status: UiStatus;
  onChange?: (status: UiStatus) => void;
};

export const StatusBadge = ({ status, onChange }: StatusBadgeProps) => {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const updatePosition = () => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const panelWidth = 128;
    const gap = 6;
    let left = rect.right - panelWidth;
    if (left < 8) left = 8;
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
        className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[12px] font-medium ${statusStyles[status]}`}
      >
        {status}
        <ChevronDown
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open &&
        createPortal(
          <div
            id={panelId}
            ref={panelRef}
            style={{ top: pos.top, left: pos.left }}
            className="fixed z-100 min-w-[128px] rounded-lg border border-[#E4E4E7] bg-white py-1 shadow-lg"
          >
            {OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange?.(option);
                  setOpen(false);
                }}
                className="block w-full px-3 py-1.5 text-left text-[13px] text-black hover:bg-[#F4F4F5]"
              >
                {option}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
};
