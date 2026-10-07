import React from 'react';
import { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
  counts: Record<Category, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  counts,
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-gray-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-editorial font-bold text-gray-950">
            Latest Breakdowns
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Filter in-depth analyses by strategic focus area
          </p>
        </div>
        <span className="text-xs font-semibold text-gray-500">
          Showing {counts[activeCategory] || 0} {counts[activeCategory] === 1 ? 'article' : 'articles'}
        </span>
      </div>

      {/* Horizontal scrollable interactive filter controls */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none py-1">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-gray-950 text-white shadow-xs'
                  : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200/80 hover:text-gray-950'
              }`}
            >
              <span>{category}</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-md ${
                  isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                }`}
              >
                {counts[category] || 0}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
