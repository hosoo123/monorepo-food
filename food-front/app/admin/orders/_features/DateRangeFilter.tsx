"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, X } from "lucide-react";

export type DateRange = {
  from: string;
  to: string;
};

type DateRangeFilterProps = {
  value: DateRange;
  onChange: (range: DateRange) => void;
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function formatDisplayDate(iso: string) {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function labelFor(range: DateRange) {
  if (range.from && range.to) {
    return `${formatDisplayDate(range.from)} - ${formatDisplayDate(range.to)}`;
  }
  if (range.from) return `From ${formatDisplayDate(range.from)}`;
  if (range.to) return `Until ${formatDisplayDate(range.to)}`;
  return "Select date range";
}

export const DateRangeFilter = ({ value, onChange }: DateRangeFilterProps) => {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<DateRange>(value);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) setDraft(value);
  }, [open, value]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  const hasFilter = Boolean(value.from || value.to);

  const apply = () => {
    if (draft.from && draft.to && draft.from > draft.to) {
      onChange({ from: draft.to, to: draft.from });
    } else {
      onChange(draft);
    }
    setOpen(false);
  };

  const clear = () => {
    onChange({ from: "", to: "" });
    setDraft({ from: "", to: "" });
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#E4E4E7] bg-white px-3 py-2 text-[13px] text-black sm:w-auto"
      >
        <Calendar className="h-4 w-4 shrink-0" />
        <span className="max-w-[220px] truncate">{labelFor(value)}</span>
        {hasFilter && (
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              clear();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                clear();
              }
            }}
            className="rounded-full p-0.5 text-[#71717A] hover:bg-[#F4F4F5] hover:text-black"
            aria-label="Clear date filter"
          >
            <X className="h-3.5 w-3.5" />
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-40 mt-2 w-[280px] rounded-xl border border-[#E4E4E7] bg-white p-4 shadow-lg">
          <p className="mb-3 text-[13px] font-medium text-black">
            Filter by date
          </p>
          <div className="flex flex-col gap-3">
            <label className="flex flex-col gap-1 text-[12px] text-[#71717A]">
              From
              <input
                type="date"
                value={draft.from}
                onChange={(e) =>
                  setDraft((prev) => ({ ...prev, from: e.target.value }))
                }
                className="rounded-lg border border-[#E4E4E7] px-3 py-2 text-[13px] text-black outline-none focus:border-[#121316]"
              />
            </label>
            <label className="flex flex-col gap-1 text-[12px] text-[#71717A]">
              To
              <input
                type="date"
                value={draft.to}
                onChange={(e) =>
                  setDraft((prev) => ({ ...prev, to: e.target.value }))
                }
                className="rounded-lg border border-[#E4E4E7] px-3 py-2 text-[13px] text-black outline-none focus:border-[#121316]"
              />
            </label>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={clear}
              className="flex-1 rounded-full border border-[#E4E4E7] py-2 text-[13px] font-medium text-black hover:bg-[#F4F4F5]"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={apply}
              className="flex-1 rounded-full bg-[#121316] py-2 text-[13px] font-medium text-white"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
