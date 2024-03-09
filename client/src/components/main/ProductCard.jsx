import React from "react";
import Amazon from "../../assets/amazon.png";
import Flipkart from "../../assets/flipkart.png";
import AliExpress from "../../assets/aliexpress.png";
import StarRatings from "react-star-ratings";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProductCard = ({ data, productsToCompare, setProductsToCompare }) => {
  const navigate = useNavigate();
  const { title, image, url, price, rating, from } = data;
  return (
    <div className="w-full flex flex-col items-center justify-center h-96 rounded-lg bg-white overflow-hidden shadow-lg">
      <div className="flex relative items-center rounded-lg bg-white shadow-lg shadow-gray-300 p-2 justify-center h-[175px] w-[85%]">
        <img
          className="h-full w-fit object-contain rounded-lg"
          src={image || "https://source.unsplash.com/random"}
          alt=""
        />
        <img
          src={
            from === "amazon"
              ? Amazon
              : from === "flipkart"
              ? Flipkart
              : AliExpress
          }
          className="absolute -top-4 shadow-md shadow-gray-500 -left-4 w-[2.25rem] h-[2.25rem] rounded-full"
        />
      </div>
      <div className="px-6 mt-4 w-full flex justify-evenly items-center">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          {price}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          <StarRatings
            rating={
              rating !== "No rating found" && rating
                ? parseFloat(rating?.slice(0, 3))
                : 0
            }
            numberOfStars={5}
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="#FFD700"
            starEmptyColor="#d3d3d3"
          />
        </span>
      </div>
      <div className="px-6 h-24 py-2">
        <div
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 4,
            overflow: "hidden",
            maxHeight: "7rem",
          }}
          className="font-bold text-sm mb-2"
        >
          {title}
        </div>
      </div>
      <div className="px-6 mt-2 w-full flex justify-evenly items-center">
        <span
          className=""
          onClick={() => {
            navigate("/product", { state: { url } });
          }}
        >
          View More
        </span>
        <div className="flex items-center gap-2">
          Compare
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-green-600"
            onChange={(e) => {
              if (e.target.checked) {
                setProductsToCompare((prev) => {
                  if (prev.length === 3) {
                    toast.error("Max Size Reached");
                    return prev;
                  }
                  return [...prev, data];
                });
              } else {
                setProductsToCompare((prev) =>
                  prev.filter((product) => product.url !== data.url)
                );
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
