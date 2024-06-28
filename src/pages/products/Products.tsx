import React, { useState, useEffect, useCallback } from "react";
import axios from "../../services/axios";
import { Pdct } from "../../types/Products";
import Product from "../../components/product/Product";
import StarSvg from "../../assets/svg/star-7207.svg";
import Category from "../../components/categories/Categories";
import Search from "../../components/searchInput/Search";
import PriceFilter from "../../components/Filter&Sort/PriceFilter";
import Sort from "../../components/Filter&Sort/Sort"

const Products: React.FC = () => {
  const [products, setProducts] = useState<Pdct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Pdct[]>([]);
  const [isError, setISError] = useState<string | null>(null);
  const [search, setSearch] = useState<string | number>("");
  const [sortedProducts, setSortedProducts] = useState(products);
  const [sortOption, setSortOption] = useState("Sort By");
  const [minPrice, setMinPrice] = useState<number | string>("");
  const [maxPrice, setMaxPrice] = useState<number | string>("");

  // Fetch all of the products
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await axios.get("/products");
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (error) {
        if (error instanceof Error) {
          setISError(error.message);
        } else {
          setISError("An unexpected error occurred");
        }
      }
    };
    getAllProducts();
  }, []);

  // Products Search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  // handle Category Change from all Products as filteredProducts
  const handleCategoryClick = (category: string) => {
    if (category === "" || category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === category)
      );
    }
  };

  ////////////////////////////////////////////////////////////////

  //handle sorting from filteredProducts as sortedProducts (memoization done for sortOption, filteredProducts)
  const handleSort = useCallback(() => {
    const sortedArray = [...filteredProducts]; // Change from products to filteredProducts
    switch (sortOption) {
      case "":
        sortedArray
        break;
      case "Title, DESC":
        sortedArray.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "Title, ASC":
        sortedArray.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Popularity":
        sortedArray.sort(
          (a, b) =>
            b.rating.count - a.rating.count || b.rating.rate - a.rating.rate
        );
        break;
      case "Price, HL":
        sortedArray.sort((a, b) => b.price - a.price);
        break;
      case "Price, LH":
        sortedArray.sort((a, b) => a.price - b.price);
        break;
      case "Rating, HL":
        sortedArray.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case "Rating, LH":
        sortedArray.sort((a, b) => a.rating.rate - b.rating.rate);
        break;
      default:
        break;
    }
    setSortedProducts(sortedArray);
  }, [sortOption, filteredProducts]);

  // calling handle sort only when change in sortOption, products
  useEffect(() => {
    handleSort();
  }, [sortOption, products, handleSort]);

  // Handle sort option change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  ////////////////////////////////////////////////////////////////

  // Handle price range change
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value);
  };

  const handleResetPrice = () => {
    setMinPrice("");
    setMaxPrice("");
  };

  const filteredByPrice = sortedProducts.filter((product) => {
    const price = product.price;
    const min = minPrice === "" ? -Infinity : parseFloat(minPrice as string);
    const max = maxPrice === "" ? Infinity : parseFloat(maxPrice as string);
    return price >= min && price <= max;
  });

  if (isError) {
    return (
      <h1 className="text-center text-2xl font-semibold text-red-700">
        {isError}
      </h1>
    );
  }

  return (
    <section>
      <div className="mx-auto mt-12 max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 ">
        <header>
          <h1 className="text-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Discover Our Exclusive
            <span className="sm:block">Collection</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed text-center">
            Explore Top-Quality Products Curated Just for You
          </p>
          <p className="text-right mt-2">
            Get Yourself the Best from Our Top{" "}
            <span className="font-bold">
              {filteredProducts.length} Products
            </span>
            .
          </p>
        </header>

        <div className="mt-8 block lg:hidden">
          <button className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
            <span className="text-sm font-medium"> Filters & Sorting </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4 rtl:rotate-180"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>

        <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
          <div className="hidden space-y-4 lg:block">
            <Search handleSearch={handleSearch} />
            <Category onCategoryClick={handleCategoryClick} />
            <Sort handleSortChange={handleSortChange}/>

            <div>
              <p className="block text-xs font-medium text-gray-700">Filters</p>

              <div className="mt-1 space-y-2">
                <PriceFilter
                  sortedProducts={sortedProducts}
                  handleResetPrice={handleResetPrice}
                  handleMinPriceChange={handleMinPriceChange}
                  handleMaxPriceChange={handleMaxPriceChange}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                />

                <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                    <span className="text-sm font-medium"> Rating </span>

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
                        0 Selected{" "}
                      </span>

                      <button
                        type="button"
                        className="text-sm text-gray-900 underline underline-offset-4"
                      >
                        Reset
                      </button>
                    </header>

                    <ul className="space-y-1 border-t border-gray-200 p-4">
                      <li>
                        <label
                          htmlFor="fourStar"
                          className="inline-flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            id="fourStar"
                            className="size-5 rounded border-gray-300"
                          />

                          <span className="text-sm font-medium text-gray-700 flex items-center ">
                            {" "}
                            4 <img src={StarSvg} className="h-3" alt="star" /> &
                            above{" "}
                          </span>
                        </label>
                      </li>

                      <li>
                        <label
                          htmlFor="threeStar"
                          className="inline-flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            id="threeStar"
                            className="size-5 rounded border-gray-300"
                          />

                          <span className="text-sm font-medium text-gray-700 flex items-center">
                            {" "}
                            3 <img src={StarSvg} className="h-3" alt="star" /> &
                            above{" "}
                          </span>
                        </label>
                      </li>

                      <li>
                        <label
                          htmlFor="twoStar"
                          className="inline-flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            id="twoStar"
                            className="size-5 rounded border-gray-300"
                          />

                          <span className="text-sm font-medium text-gray-700 flex items-center">
                            {" "}
                            2 <img
                              src={StarSvg}
                              className="h-3"
                              alt="star"
                            />{" "}
                            <span className="font-regular"> & above</span>{" "}
                          </span>
                        </label>
                      </li>

                      <li>
                        <label
                          htmlFor="oneStar"
                          className="inline-flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            id="oneStar"
                            className="size-5 rounded border-gray-300"
                          />

                          <span className="text-sm font-medium text-gray-700 flex items-center">
                            {" "}
                            1 <img src={StarSvg} className="h-3" alt="star" /> &
                            above{" "}
                          </span>
                        </label>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 flex-grow">
            <Product search={search} products={filteredByPrice} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
