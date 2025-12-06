"use client";

import React, { useState } from "react";
import { X, QrCode, ChevronDown } from "lucide-react";

interface AddDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddDeviceModal({ isOpen, onClose }: AddDeviceModalProps) {
  const [pin, setPin] = useState("");
  const [selectedScreen, setSelectedScreen] = useState("Main Lobby Display");

  if (!isOpen) return null;

  const handleAddDevice = () => {
    console.log("Adding device with PIN:", pin, "Screen:", selectedScreen);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-lg border border-gray-200 dark:border-gray-700">

        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl sm:text-2xl font-semibold text-Headings dark:text-white">
            Add New Device
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-5 sm:space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Steps */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-3.5 sm:left-4 top-8 bottom-8 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
            
            <div className="space-y-4 sm:space-y-5 relative">
              {/* Step 1 */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-qrBackground dark:bg-gray-800 border border-borderGray dark:border-gray-600 text-gray-600 dark:text-gray-400 flex items-center justify-center font-semibold text-xs sm:text-sm shrink-0 mt-0.5 relative z-10">
                  1
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-medium text-Headings dark:text-white">
                    Open Tape App
                  </h3>
                  <p className="text-xs sm:text-sm text-MutedText dark:text-gray-400 mt-0.5 sm:mt-1">
                    Open Tape app on your Smart TV or browser.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-qrBackground dark:bg-gray-800 border border-borderGray dark:border-gray-600 text-gray-600 dark:text-gray-400 flex items-center justify-center font-semibold text-xs sm:text-sm shrink-0 mt-0.5 relative z-10">
                  2
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-medium text-Headings dark:text-white">
                    Set Up the Device
                  </h3>
                  <p className="text-xs sm:text-sm text-MutedText dark:text-gray-400 mt-0.5 sm:mt-1">
                    Set Up your device Providing a name, Location and Storage usage Limit.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-qrBackground dark:bg-gray-800 border border-borderGray dark:border-gray-600 text-gray-600 dark:text-gray-400 flex items-center justify-center font-semibold text-xs sm:text-sm shrink-0 mt-0.5 relative z-10">
                  3
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-medium text-Headings dark:text-white">
                    Enter the PIN
                  </h3>
                  <p className="text-xs sm:text-sm text-MutedText dark:text-gray-400 mt-0.5 sm:mt-1">
                    A pairing screen will appear—enter the PIN or scan the QR code shown on your device.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-qrBackground dark:bg-gray-800 border border-borderGray dark:border-gray-600 text-gray-600 dark:text-gray-400 flex items-center justify-center font-semibold text-xs sm:text-sm shrink-0 mt-0.5 relative z-10">
                  4
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-medium text-Headings dark:text-white">
                    Start Displaying
                  </h3>
                  <p className="text-xs sm:text-sm text-MutedText dark:text-gray-400 mt-0.5 sm:mt-1">
                    Your screen is now connected and ready to go!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* PIN Input */}
          <div className="flex items-center gap-2 sm:gap-3">
            <input
              type="text"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter the PIN or scan the QR code"
              className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border border-borderGray dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            <button className="p-2.5 sm:p-3 border border-borderGray dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shrink-0 bg-qrBackground dark:bg-gray-800">
              <QrCode className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Select Screen Dropdown */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
              Select a Screen
            </label>
            <div className="relative">
              <select
                value={selectedScreen}
                onChange={(e) => setSelectedScreen(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base text-gray-900 dark:text-white appearance-none cursor-pointer"
              >
                <option>Main Lobby Display</option>
                <option>Conference Room Screen</option>
                <option>Reception Area</option>
                <option>Store A - NYC</option>
                <option>Store B - LA</option>
              </select>
              <ChevronDown className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 mx-5 py-4 sm:py-5 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-5 sm:px-6 py-2 sm:py-2.5 border border-bgBlue dark:border-blue-600 rounded-lg font-medium text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAddDevice}
            className="px-5 sm:px-6 py-2 sm:py-2.5 bg-bgBlue text-white rounded-lg font-medium text-sm sm:text-base hover:bg-blue-600 transition-colors"
          >
            Add Device
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddDeviceModal;