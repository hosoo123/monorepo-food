"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { type UiStatus, statusStyles } from "./StatusBadge";

const OPTIONS: UiStatus[] = ["Delivered", "Pending", "Cancelled"];

type ChangeDeliveryStateModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (status: UiStatus) => void;
  saving?: boolean;
};

export const ChangeDeliveryStateModal = ({
  open,
  onClose,
  onSave,
  saving,
}: ChangeDeliveryStateModalProps) => {
  const [selected, setSelected] = useState<UiStatus>("Delivered");

  useEffect(() => {
    if (open) setSelected("Delivered");
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-[360px] rounded-2xl bg-white p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[16px] font-semibold text-black">
            Change delivery state
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-[#71717A] hover:bg-[#F4F4F5]"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {OPTIONS.map((option) => {
            const isActive = selected === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setSelected(option)}
                className={`rounded-full border px-4 py-1.5 text-[13px] font-medium transition-colors ${
                  isActive
                    ? statusStyles.Pending
                    : "border-transparent bg-[#F4F4F5] text-black"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          disabled={saving}
          onClick={() => onSave(selected)}
          className="w-full rounded-full bg-[#121316] py-2.5 text-[14px] font-medium text-white disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};
