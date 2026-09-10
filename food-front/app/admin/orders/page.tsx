"use client";

import { useCallback, useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Sidebar } from "../_features/Sidebar";
import { OrdersTable, type AdminOrder } from "./_features/OrdersTable";
import { Pagination } from "./_features/Pagination";
import { ChangeDeliveryStateModal } from "./_features/ChangeDeliveryStateModal";
import { DeleteOrderModal } from "./_features/DeleteOrderModal";
import {
  DateRangeFilter,
  type DateRange,
} from "./_features/DateRangeFilter";
import { type UiStatus } from "./_features/StatusBadge";
import { apiUrl } from "@/lib/api";
import { LoadingSpinner } from "@/app/_components/LoadingSpinner";

const PAGE_SIZE = 10;

function toUiStatus(status: string): UiStatus {
  if (status === "DELIVERED") return "Delivered";
  if (status === "CANCELED" || status === "CANCELLED") return "Cancelled";
  return "Pending";
}

function toApiStatus(status: UiStatus): "PENDING" | "DELIVERED" | "CANCELED" {
  if (status === "Delivered") return "DELIVERED";
  if (status === "Cancelled") return "CANCELED";
  return "PENDING";
}

function formatDate(value?: string) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}/${m}/${day}`;
}

type ApiOrder = {
  _id: string;
  totalPrice?: number;
  address?: string;
  status?: string;
  createdAt?: string;
  user?: { email?: string; name?: string } | null;
  foodOrderItems?: Array<{
    quantity?: number;
    foodName?: string;
    image?: string;
    food?: { foodName?: string; image?: string; name?: string } | null;
  }>;
};

function mapOrder(raw: ApiOrder): AdminOrder {
  return {
    id: raw._id,
    customer: raw.user?.email || raw.user?.name || "Unknown",
    foods: (raw.foodOrderItems ?? []).map((item) => ({
      name: item.foodName || item.food?.foodName || item.food?.name || "Food",
      quantity: item.quantity ?? 1,
      image: item.image || item.food?.image,
    })),
    date: formatDate(raw.createdAt),
    total: `$${(raw.totalPrice ?? 0).toFixed(2)}`,
    address: raw.address || "",
    status: toUiStatus(raw.status || "PENDING"),
  };
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AdminOrder | null>(null);
  const [bulkDelete, setBulkDelete] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({ from: "", to: "" });

  const fetchOrders = useCallback(
    async (pageNum: number, showLoader = false, range = dateRange) => {
      try {
        if (showLoader) setLoading(true);

        const params = new URLSearchParams({
          page: String(pageNum),
          limit: String(PAGE_SIZE),
        });
        if (range.from) params.set("from", range.from);
        if (range.to) params.set("to", range.to);

        const res = await fetch(apiUrl(`/order?${params.toString()}`));
        if (!res.ok) throw new Error("Failed to load orders");
        const data = await res.json();

        const list: ApiOrder[] = Array.isArray(data)
          ? data
          : Array.isArray(data.orders)
            ? data.orders
            : [];
        const totalCount = Array.isArray(data)
          ? data.length
          : Number(data.total ?? list.length);
        const pages = Array.isArray(data)
          ? Math.max(1, Math.ceil(data.length / PAGE_SIZE))
          : Math.max(
              1,
              Number(data.totalPages ?? Math.ceil(totalCount / PAGE_SIZE)),
            );

        setOrders(list.map(mapOrder));
        setTotal(totalCount);
        setTotalPages(pages);
      } catch (error) {
        console.error(error);
        toast.error("Захиалга татахад алдаа гарлаа");
        setOrders([]);
        setTotal(0);
        setTotalPages(1);
      } finally {
        if (showLoader) setLoading(false);
      }
    },
    [dateRange],
  );

  useEffect(() => {
    void fetchOrders(page, true);
  }, [fetchOrders, page]);

  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
    setSelectedIds(new Set());
    setPage(1);
  };

  const selectedCount = selectedIds.size;

  const updateStatuses = async (ids: string[], status: UiStatus) => {
    setSaving(true);
    try {
      const res = await fetch(apiUrl("/order"), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids, status: toApiStatus(status) }),
      });
      if (!res.ok) throw new Error("Update failed");

      setOrders((prev) =>
        prev.map((o) => (ids.includes(o.id) ? { ...o, status } : o)),
      );
      setSelectedIds(new Set());
      setModalOpen(false);
      toast.success("Delivery state updated");
    } catch (error) {
      console.error(error);
      toast.error("Төлөв шинэчлэхэд алдаа гарлаа");
    } finally {
      setSaving(false);
    }
  };

  const onToggle = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const onToggleAll = (checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) {
        orders.forEach((o) => next.add(o.id));
      } else {
        orders.forEach((o) => next.delete(o.id));
      }
      return next;
    });
  };

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages || nextPage === page) return;
    setSelectedIds(new Set());
    setPage(nextPage);
  };

  const openDeleteOne = (order: AdminOrder) => {
    setDeleteTarget(order);
    setBulkDelete(false);
    setDeleteOpen(true);
  };

  const openDeleteSelected = () => {
    if (selectedCount === 0) return;
    setDeleteTarget(null);
    setBulkDelete(true);
    setDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    if (deleting) return;
    setDeleteOpen(false);
    setDeleteTarget(null);
    setBulkDelete(false);
  };

  const confirmDelete = async () => {
    const ids = bulkDelete
      ? [...selectedIds]
      : deleteTarget
        ? [deleteTarget.id]
        : [];
    if (!ids.length) return;

    setDeleting(true);
    try {
      const res = await fetch(apiUrl("/order"), {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      if (!res.ok) throw new Error("Delete failed");

      toast.success(
        ids.length > 1
          ? `${ids.length} orders deleted`
          : "Order deleted",
      );
      setDeleteOpen(false);
      setDeleteTarget(null);
      setBulkDelete(false);
      setSelectedIds(new Set());

      const remainingOnPage = orders.length - ids.filter((id) =>
        orders.some((o) => o.id === id),
      ).length;
      const nextPage =
        remainingOnPage <= 0 && page > 1 ? page - 1 : page;
      if (nextPage !== page) setPage(nextPage);
      else await fetchOrders(page, false);
    } catch (error) {
      console.error(error);
      toast.error("Захиалга устгахад алдаа гарлаа");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-[#FAFAFA] lg:flex-row">
      <Sidebar />

      <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-[20px] font-semibold text-black">Orders</h1>
            <p className="text-[13px] text-[#71717A]">{total} items</p>
          </div>

          <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
            <DateRangeFilter
              value={dateRange}
              onChange={handleDateRangeChange}
            />

            <button
              type="button"
              disabled={selectedCount === 0}
              onClick={() => setModalOpen(true)}
              className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-[13px] ${
                selectedCount > 0
                  ? "bg-[#121316] text-white"
                  : "bg-[#E4E4E7] text-[#A1A1AA]"
              }`}
            >
              Change delivery state
              {selectedCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-[11px] font-semibold text-black">
                  {selectedCount}
                </span>
              )}
            </button>

            <button
              type="button"
              disabled={selectedCount === 0}
              onClick={openDeleteSelected}
              className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-[13px] ${
                selectedCount > 0
                  ? "border border-[#FECACA] bg-[#FEF2F2] text-[#EF4444]"
                  : "bg-[#E4E4E7] text-[#A1A1AA]"
              }`}
            >
              <Trash2 className="h-4 w-4" />
              Delete
              {selectedCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-[11px] font-semibold text-[#EF4444]">
                  {selectedCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-white p-10 sm:p-16">
            <LoadingSpinner className="h-8 w-8" />
            <p className="text-sm text-zinc-500">Loading orders...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <OrdersTable
                orders={orders}
                selectedIds={selectedIds}
                onToggle={onToggle}
                onToggleAll={onToggleAll}
                onStatusChange={(id, status) => updateStatuses([id], status)}
                onDelete={openDeleteOne}
                startIndex={(page - 1) * PAGE_SIZE}
              />
            </div>
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>

      <ChangeDeliveryStateModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        saving={saving}
        onSave={(status) => updateStatuses([...selectedIds], status)}
      />

      <DeleteOrderModal
        open={deleteOpen}
        count={bulkDelete ? selectedCount : 1}
        customer={deleteTarget?.customer}
        deleting={deleting}
        onClose={closeDeleteModal}
        onConfirm={() => void confirmDelete()}
      />
    </div>
  );
}
