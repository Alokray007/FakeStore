import React from "react";
import { PriceFilterProps } from "../../types/Products";

const PriceFilter: React.FC<PriceFilterProps> = ({
  FinalFilter,
  handleResetPrice,
  handleMinPriceChange,
  handleMaxPriceChange,
  minPrice,
  maxPrice,
}) => {
  return (
    <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
        <span className="text-sm font-medium"> Price </span>

        <span className="transition group-open:-rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </summary>

      <div className="border-t border-gray-200 bg-white">
        <header className="flex items-center justify-between p-4">
          <span className="text-sm text-gray-700">
            {" "}
            The highest price is $
            {Math.max(...FinalFilter.map((product) => product.price))}{" "}
          </span>

          <button
            type="button"
            className="text-sm text-gray-900 underline underline-offset-4 hover:text-blue-500"
            onClick={handleResetPrice}
          >
            Reset
          </button>
        </header>

        <div className="border-t border-gray-200 p-4">
          <div className="flex justify-between gap-4">
            <label
              htmlFor="FilterPriceFrom"
              className="flex items-center gap-2"
            >
              <span className="text-sm text-gray-600">$</span>

              <input
                type="number"
                id="FilterPriceFrom"
                placeholder="From"
                className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                value={minPrice}
                onChange={handleMinPriceChange}
              />
            </label>

            <label htmlFor="FilterPriceTo" className="flex items-center gap-2">
              <span className="text-sm text-gray-600">$</span>

              <input
                type="number"
                id="FilterPriceTo"
                placeholder="To"
                className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                value={maxPrice}
                onChange={handleMaxPriceChange}
              />
            </label>
          </div>
        </div>
      </div>
    </details>
  );
};

export default PriceFilter;
