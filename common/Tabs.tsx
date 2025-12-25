"use client";

import React from "react";

export interface TabItem<T extends string> {
  label: T;
  icon: React.ComponentType<React.ComponentPropsWithoutRef<'svg'>>;
  onClick?: () => void;
}

interface TabsProps<T extends string> {
  tabs: TabItem<T>[];
  activeTab: T;
  setActiveTab: (tab: T) => void;
}

const Tabs = <T extends string>({ tabs, activeTab, setActiveTab }: TabsProps<T>) => {
  return (
    <div className="flex flex-wrap justify-start gap-2 sm:gap-4 mb-6">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.label;

        return (
          <button
            key={tab.label}
            onClick={() => {
              setActiveTab(tab.label);
              tab.onClick?.();
            }}
            className={`flex items-center gap-2 capitalize cursor-pointer px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base font-medium rounded-lg transition-all duration-200 border ${
              isActive
                ? "text-bgBlue border-gray-200 bg-white"
                : "text-textGray hover:text-gray-700 hover:bg-gray-100 border-transparent"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
