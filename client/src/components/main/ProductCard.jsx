import React from "react";
import Amazon from "../../assets/amazon.png";
import Flipkart from "../../assets/flipkart.png";
import AliExpress from "../../assets/aliexpress.png";
import StarRatings from "react-star-ratings";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ data }) => {
  const navigate = useNavigate();
  const { title, image, url, price, rating, from } = data;
  return (
    <div
      className="w-full flex flex-col items-center justify-center h-96 rounded-lg bg-white overflow-hidden shadow-lg"
      onClick={() => {
        navigate("/product", { state: { url } });
      }}
    >
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
      <div className="px-6 h-32 py-2">
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
      <div className="px-6 w-full justify-evenly items-center">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {price}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
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
    </div>
  );
};

export default ProductCard;
