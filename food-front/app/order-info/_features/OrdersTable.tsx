"use client";

import { ChevronDown } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

type Status = "Pending" | "Delivered" | "Cancelled";

interface Order {
  id: number;
  customer: string;
  foodCount: string;
  date: string;
  total: string;
  address: string;
  status: Status;
}

const orders: Order[] = [
  { id: 1, customer: "Test@gamil.com", foodCount: "2 foods", date: "2024/12/20", total: "$26.97", address: "2024/12/СБД, 12-р хороо, СБД хагдсан эмнэлэг Sbd negdse...", status: "Pending" },
  { id: 1, customer: "Test@gamil.com", foodCount: "2 foods", date: "2024/12/20", total: "$26.97", address: "2024/12/СБД, 12-р хороо, СБД хагдсан эмнэлэг Sbd negdse...", status: "Pending" },
  { id: 1, customer: "Test@gamil.com", foodCount: "2 foods", date: "2024/12/20", total: "$26.97", address: "2024/12/СБД, 12-р хороо, СБД хагдсан эмнэлэг Sbd negdse...", status: "Pending" },
  { id: 1, customer: "Test@gamil.com", foodCount: "2 foods", date: "2024/12/20", total: "$26.97", address: "2024/12/СБД, 12-р хороо, СБД хагдсан эмнэлэг Sbd negdse...", status: "Delivered" },
  { id: 1, customer: "Test@gamil.com", foodCount: "2 foods", date: "2024/12/20", total: "$26.97", address: "2024/12/СБД, 12-р хороо, СБД хагдсан эмнэлэг Sbd negdse...", status: "Delivered" },
  { id: 1, customer: "Test@gamil.com", foodCount: "2 foods", date: "2024/12/20", total: "$26.97", address: "2024/12/СБД, 12-р хороо, СБД хагдсан эмнэлэг Sbd negdse...", status: "Delivered" },
  { id: 1, customer: "Test@gamil.com", foodCount: "2 foods", date: "2024/12/20", total: "$26.97", address: "2024/12/СБД, 12-р хороо, СБД хагдсан эмнэлэг Sbd negdse...", status: "Delivered" },
  { id: 1, customer: "Test@gamil.com", foodCount: "2 foods", date: "2024/12/20", total: "$26.97", address: "2024/12/СБД, 12-р хороо, СБД хагдсан эмнэлэг Sbd negdse...", status: "Cancelled" },
  { id: 1, customer: "Test@gamil.com", foodCount: "2 foods", date: "2024/12/20", total: "$26.97", address: "2024/12/СБД, 12-р хороо, СБД хагдсан эмнэлэг Sbd negdse...", status: "Cancelled" },
  { id: 1, customer: "Test@gamil.com", foodCount: "2 foods", date: "2024/12/20", total: "$26.97", address: "2024/12/СБД, 12-р хороо, СБД хагдсан эмнэлэг Sbd negdse...", status: "Cancelled" },
  { id: 1, customer: "Test@gamil.com", foodCount: "2 foods", date: "2024/12/20", total: "$26.97", address: "2024/12/СБД, 12-р хороо, СБД хагдсан эмнэлэг Sbd negdse...", status: "Cancelled" },
];

export const OrdersTable = () => {
  return (
    <div className="bg-white rounded-lg border border-[#E4E4E7] overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-[#E4E4E7] text-[12px] text-[#71717A]">
            <th className="px-4 py-3 w-10">
              <input type="checkbox" />
            </th>
            <th className="px-2 py-3">№</th>
            <th className="px-2 py-3">Customer</th>
            <th className="px-2 py-3">
              <div className="flex items-center gap-1">
                Food <ChevronDown className="w-3 h-3" />
              </div>
            </th>
            <th className="px-2 py-3">
              <div className="flex items-center gap-1">
                Date <ChevronDown className="w-3 h-3" />
              </div>
            </th>
            <th className="px-2 py-3">Total</th>
            <th className="px-2 py-3">Delivery Address</th>
            <th className="px-2 py-3">
              <div className="flex items-center gap-1">
                Delivery state <ChevronDown className="w-3 h-3" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, i) => (
            <tr
              key={i}
              className="border-b border-[#F4F4F5] text-[13px] text-black last:border-0"
            >
              <td className="px-4 py-3">
                <input type="checkbox" />
              </td>
              <td className="px-2 py-3">{order.id}</td>
              <td className="px-2 py-3 text-[#71717A]">{order.customer}</td>
              <td className="px-2 py-3">
                <div className="flex items-center gap-1 text-[#71717A]">
                  {order.foodCount} <ChevronDown className="w-3 h-3" />
                </div>
              </td>
              <td className="px-2 py-3 text-[#71717A]">{order.date}</td>
              <td className="px-2 py-3">{order.total}</td>
              <td className="px-2 py-3 text-[#71717A] max-w-[220px] truncate">
                {order.address}
              </td>
              <td className="px-2 py-3">
                <StatusBadge status={order.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};