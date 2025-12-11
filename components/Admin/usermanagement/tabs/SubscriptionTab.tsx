// src/components/Admin/tabs/SubscriptionTab.tsx
"use client";

import { Shuffle, MoreVertical } from "lucide-react";

const paymentHistory = [
  { invoice: "INV-2023-1245", amount: "$299.00", status: "Paid", date: "Nov 15, 2025" },
  { invoice: "INV-2023-1245", amount: "$299.00", status: "Paid", date: "Oct 15, 2024" },
  { invoice: "INV-2023-1245", amount: "$299.00", status: "Failed", date: "Sep 15, 2024" },
  { invoice: "INV-2023-1245", amount: "$299.00", status: "Paid", date: "Aug 15, 2024" },
];

export default function SubscriptionTab({ onOpenChangePlan }: { onOpenChangePlan: () => void }) {
  return (
    <div className="space-y-8">
      {/* Current Plan */}
      <div>
        <div className="flex justify-between items-center mb-6">
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
            className="px-6 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium shadow-customShadow"
          >
            <Shuffle className="w-4 h-4" />
            Change Plan
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-customShadow">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Plan</p>
            <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-full text-xs font-medium">
              Enterprise
            </span>
          </div>
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-customShadow">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Billing Cycle</p>
            <p className="font-medium text-gray-900 dark:text-white">Monthly</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-customShadow">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Price</p>
            <p className="font-medium text-gray-900 dark:text-white">$299/month</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-customShadow">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Next Billing</p>
            <p className="font-medium text-gray-900 dark:text-white">December 15, 2024</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-customShadow">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Auto Renew</p>
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900 dark:text-white">Enabled</span>
              <div className="w-11 h-6 bg-blue-600 rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all"></div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-customShadow">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Billing Status</p>
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-medium">
              Active
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
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Download Invoices
          </button>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-customShadow">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paymentHistory.map((p, i) => (
                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{p.invoice}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{p.amount}</td>
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
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{p.date}</td>
                  <td className="px-6 py-4">
                    <MoreVertical className="w-4 h-4 text-gray-400 dark:text-gray-500" />
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