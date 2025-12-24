// src/components/Admin/tabs/SubscriptionTab.tsx
"use client";

import { Shuffle, Download, Eye, MoreVertical } from "lucide-react";

const paymentHistory = [
  {
    invoice: "INV-2023-1245",
    amount: "$299.00",
    status: "Paid",
    date: "December 15, 2024",
    method: "Visa **** **** **** 4025",
  },
  {
    invoice: "INV-2023-1245",
    amount: "$299.00",
    status: "Paid",
    date: "December 15, 2024",
    method: "Visa **** **** **** 4025",
  },
  {
    invoice: "INV-2023-1245",
    amount: "$299.00",
    status: "Paid",
    date: "December 15, 2024",
    method: "Visa **** **** **** 4025",
  },
  {
    invoice: "INV-2023-1245",
    amount: "$299.00",
    status: "Paid",
    date: "December 15, 2024",
    method: "Visa **** **** **** 4025",
  },
  {
    invoice: "INV-2023-1245",
    amount: "$299.00",
    status: "Paid",
    date: "December 15, 2024",
    method: "Visa **** **** **** 4025",
  },
  {
    invoice: "INV-2023-1245",
    amount: "$299.00",
    status: "Paid",
    date: "December 15, 2024",
    method: "Visa **** **** **** 4025",
  },
];

export default function SubscriptionTab({
  onOpenChangePlan,
}: {
  onOpenChangePlan: () => void;
}) {
  return (
    <div className="space-y-8">
      {/* Current Plan */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Current Plan
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Active subscription details
            </p>
          </div>
          <button
            onClick={onOpenChangePlan}
            className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Edit2 className="w-4 h-4" />
            Change Plan
          </button>
        </div>

        {/* 2 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
          {/* Row 1 */}
          <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Plan
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs font-medium border border-orange-200 dark:border-orange-800">
              Enterprise
            </span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Billing Cycle
            </span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              Monthly
            </span>
          </div>

          {/* Row 2 */}
          <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Price
            </span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              $299/month
            </span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Next Billing
            </span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              December 15, 2024
            </span>
          </div>

          {/* Row 3 */}
          <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Auto Renew
            </span>
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
              Enabled
            </span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Billing Status
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium border border-green-200 dark:border-green-800 flex items-center gap-1.5">
              Active
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            </span>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Payment History
          </h3>
          <button className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors cursor-pointer">
            Download All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Invoice
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Payment Method
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Date
                </th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {paymentHistory.map((p, i) => (
                <tr
                  key={i}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                >
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">
                    {p.invoice}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="px-1.5 py-0.5 border border-blue-200 bg-blue-50 text-blue-700 rounded text-[10px] uppercase font-bold">VISA</span>
                    {p.method}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">
                    {p.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium border inline-block ${
                        p.status === "Paid"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
                          : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {p.date}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer">
                      <Download className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Edit2({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
        </svg>
    );
}
