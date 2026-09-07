import { Sidebar } from "../_features/Sidebar";
import { OrdersTable } from "./_features/OrdersTable";
import { Pagination } from "./_features/Pagination";
import { Calendar } from "lucide-react";

export default function OrdersPage() {
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#FAFAFA]">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-[20px] font-semibold text-black">Orders</h1>
            <p className="text-[13px] text-[#71717A]">32 items</p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <button className="flex items-center justify-center gap-2 px-3 py-2 border border-[#E4E4E7] rounded-lg text-[13px] text-black">
              <Calendar className="w-4 h-4 shrink-0" />
              <span className="truncate">13 June 2023 - 14 July 2023</span>
            </button>
            <button
              className="px-4 py-2 rounded-lg text-[13px] bg-[#E4E4E7] text-[#A1A1AA]"
              disabled
            >
              Change delivery state
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <OrdersTable />
        </div>
        <Pagination />
      </main>
    </div>
  );
}
