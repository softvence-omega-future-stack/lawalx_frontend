// src/components/Admin/tabs/SubscriptionTab.tsx
"use client";

import { Shuffle, MoreVertical } from "lucide-react";

const paymentHistory = [
  {
    invoice: "INV-2023-1245",
    amount: "$299.00",
    status: "Paid",
    date: "Nov 15, 2025",
  },
  {
    invoice: "INV-2023-1245",
    amount: "$299.00",
    status: "Paid",
    date: "Oct 15, 2024",
  },
  {
    invoice: "INV-2023-1245",
    amount: "$299.00",
    status: "Failed",
    date: "Sep 15, 2024",
  },
  {
    invoice: "INV-2023-1245",
    amount: "$299.00",
    status: "Paid",
    date: "Aug 15, 2024",
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
      <div>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Current Plan
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Active subscription details
            </p>
          </div>
          <button
            onClick={onOpenChangePlan}
            className="px-6 py-2.5 dark:text-white text-black bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium shadow-customShadow cursor-pointer"
          >
            <Shuffle className="w-4 h-4" />
            Change Plan
          </button>
        </div>

        {/* 2 Column Grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          {/* Row 1 */}
          <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Plan
            </span>
            <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-full text-xs font-medium">
              Enterprise
            </span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Auto Renew
            </span>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Enabled
            </span>
          </div>

          {/* Row 2 */}
          <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Price
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              $299/month
            </span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Billing Status
            </span>
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-medium">
              Active
            </span>
          </div>

          {/* Row 3 */}
          <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Billing Cycle
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              Monthly
            </span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Next Billing
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              December 15, 2024
            </span>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Payment History
          </h3>
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium cursor-pointer">
            Download Invoices
          </button>
        </div>
        <div className="bg-navbarBg rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-customShadow">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paymentHistory.map((p, i) => (
                <tr
                  key={i}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {p.invoice}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {p.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        p.status === "Paid"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                          : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {p.date}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                      <MoreVertical className="w-4 h-4" />
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
