import React, { useEffect, useState } from "react";
import Select from "react-select";
import ProductCard from "./ProductCard";
import Input from "./Input";

const Search = ({
  data,
  search,
  setSearch,
  productsToCompare,
  setProductsToCompare,
}) => {
  const [filterData, setFilterData] = useState(data);
  const [company, setCompany] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [rating, setRating] = useState(0);

  const companies = [
    { value: "all", label: "All companies" },
    { value: "amazon", label: "Amazon" },
    { value: "flipkart", label: "Flipkart" },
    { value: "aliexpress", label: "AliExpress" },
  ];

  const priceRanges = [
    { value: { min: 0, max: 100000 }, label: "All prize ranges" },
    { value: { min: 0, max: 10000 }, label: "0 - 10,000" },
    { value: { min: 10000, max: 50000 }, label: "10,000 - 50,000" },
    { value: { min: 50000, max: 100000 }, label: "50,000 - 100,000" },
    { value: { min: 100000, max: 200000 }, label: "100,000 - 200,000" },
    { value: { min: 20000, max: Infinity }, label: "200,000 +" },
  ];

  const ratings = [
    { value: 0, label: "All ratings" },
    { value: 1, label: "1+" },
    { value: 2, label: "2+" },
    { value: 3, label: "3+" },
    { value: 4, label: "4+" },
    { value: 5, label: "5" },
  ];

  const filter = () => {
    let temp = data;
    if (company !== "all") {
      temp = temp?.filter((item) => item.from === company);
    }
    temp = temp?.filter(
      (item) =>
        parseFloat(item.price.replace(/[^0-9.-]+/g, "")) >= priceRange.min &&
        parseFloat(item.price.replace(/[^0-9.-]+/g, "")) <= priceRange.max
    );
    temp = temp?.filter((item) => parseFloat(item.rating) >= rating);
    setFilterData(temp);
  };

  useEffect(() => {
    filter();
  }, [company, priceRange, rating]);

  useEffect(() => {
    setFilterData(data);
  }, [data]);

  return (
    <div className="w-full h-full pt-28 pb-10 overflow-y-auto gap-3">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="h-36 w-[90%] rounded-xl px-16 bg-gradient-to-tl flex justify-between items-center">
          <div className="">
            <Input
              placeholder="Search for products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center gap-4">
            <Select
              options={companies}
              value={companies.find((obj) => obj.value === company)}
              className="w-44"
              onChange={(option) => setCompany(option.value)}
            />
            <Select
              options={priceRanges}
              className="w-44"
              value={priceRanges.find(
                (obj) =>
                  JSON.stringify(obj.value) === JSON.stringify(priceRange)
              )}
              onChange={(option) => setPriceRange(option.value)}
            />
            <Select
              options={ratings}
              className="w-44"
              value={ratings.find((obj) => obj.value === rating)}
              onChange={(option) => setRating(option.value)}
            />
          </div>
        </div>
        <div className="h-full w-full grid grid-cols-3 gap-14 overflow-y-auto px-32 py-8">
          {filterData?.map((item, index) => {
            return (
              <ProductCard
                key={index}
                data={item}
                productsToCompare={productsToCompare}
                setProductsToCompare={setProductsToCompare}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;
