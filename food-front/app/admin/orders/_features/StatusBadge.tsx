import { ChevronDown } from "lucide-react";

type Status = "Pending" | "Delivered" | "Cancelled";

const statusStyles: Record<Status, string> = {
  Pending: "border-[#EF4444] text-[#EF4444]",
  Delivered: "border-[#22C55E] text-[#22C55E]",
  Cancelled: "border-[#A1A1AA] text-[#A1A1AA]",
};

export const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-[12px] font-medium ${statusStyles[status]}`}
    >
      {status}
      <ChevronDown className="w-3 h-3" />
    </div>
  );
};