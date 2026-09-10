"use client";

import { Trash2, X } from "lucide-react";

type DeleteOrderModalProps = {
  open: boolean;
  count: number;
  customer?: string;
  onClose: () => void;
  onConfirm: () => void;
  deleting?: boolean;
};

export const DeleteOrderModal = ({
  open,
  count,
  customer,
  onClose,
  onConfirm,
  deleting,
}: DeleteOrderModalProps) => {
  if (!open) return null;

  const title =
    count > 1 ? `Delete ${count} orders?` : "Delete this order?";
  const description =
    count > 1
      ? "Selected orders will be permanently removed. This cannot be undone."
      : customer
        ? `Order from ${customer} will be permanently removed. This cannot be undone.`
        : "This order will be permanently removed. This cannot be undone.";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-[380px] rounded-2xl bg-white p-5 shadow-xl">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FEF2F2]">
              <Trash2 className="h-5 w-5 text-[#EF4444]" />
            </div>
            <div>
              <h2 className="text-[16px] font-semibold text-black">{title}</h2>
              <p className="mt-1 text-[13px] leading-5 text-[#71717A]">
                {description}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="rounded-full p-1 text-[#71717A] hover:bg-[#F4F4F5] disabled:opacity-50"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="flex-1 rounded-full border border-[#E4E4E7] py-2.5 text-[14px] font-medium text-black hover:bg-[#F4F4F5] disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={deleting}
            className="flex-1 rounded-full bg-[#EF4444] py-2.5 text-[14px] font-medium text-white hover:bg-[#DC2626] disabled:opacity-60"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};
