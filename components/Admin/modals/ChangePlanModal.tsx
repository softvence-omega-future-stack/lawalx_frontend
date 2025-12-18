"use client";

import { X, Shuffle } from "lucide-react";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  currentPlan: string;
}

export default function ChangePlanModal({ isOpen, onClose, onConfirm, currentPlan }: Props) {
  const [plan, setPlan] = useState(currentPlan);
  const [deviceLimit, setDeviceLimit] = useState("50");
  const [storageLimit, setStorageLimit] = useState("100");
  const [price, setPrice] = useState("$299");

  const handleConfirm = () => {
    onConfirm({ plan, deviceLimit, storageLimit, price });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 dark:bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-2xl border border-gray-200 dark:border-gray-700 shadow-xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <Shuffle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Change Subscription Plan
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Same rich form as in Edit User
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Select Plan
            </label>
            <div className="grid grid-cols-4 gap-4">
              {["Demo", "Basic", "Pro", "Enterprise"].map((p) => (
                <button
                  key={p}
                  onClick={() => setPlan(p)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    plan === p
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                      : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                  }`}
                >
                  <div className="font-semibold text-gray-900 dark:text-white">{p}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {p === "Demo" ? "$0" : p === "Basic" ? "$29" : p === "Pro" ? "$99" : "$299+"}/mo
                  </div>
                </button>
              ))}
            </div>
          </div>

          {plan === "Enterprise" && (
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg grid grid-cols-3 gap-4 border border-gray-200 dark:border-gray-700">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Device Limit
                </label>
                <input
                  value={deviceLimit}
                  onChange={(e) => setDeviceLimit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Storage (GB)
                </label>
                <input
                  value={storageLimit}
                  onChange={(e) => setStorageLimit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Price
                </label>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 cursor-pointer py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-6 cursor-pointer py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-medium"
          >
            Change Plan
          </button>
        </div>
      </div>
    </div>
  );
}