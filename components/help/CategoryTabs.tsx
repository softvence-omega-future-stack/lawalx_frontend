"use client";

import React from 'react';

interface CategoryTabsProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 mb-8 overflow-x-auto no-scrollbar px-4 sm:px-0">
      <div className="flex space-x-8 min-w-max">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`pb-4 text-sm font-medium transition-colors relative cursor-pointer ${
              selectedCategory === category
                ? 'text-blue-500 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            {category}
            {selectedCategory === category && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-t-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
