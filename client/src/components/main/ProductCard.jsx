import React from "react";
import Amazon from "../../assets/amazon.png";
import Flipkart from "../../assets/flipkart.png";
import AliExpress from "../../assets/aliexpress.png";
import StarRatings from "react-star-ratings";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import FilledHeart from "../../assets/FilledHeart.svg";
import EmptyHeart from "../../assets/EmptyHeart.svg";

const ProductCard = ({ data, productsToCompare, setProductsToCompare }) => {
  const navigate = useNavigate();
  const { title, image, url, price, rating, from } = data;
  return (
    <div
      className="w-full p-3 flex flex-col items-center justify-center h-[27rem] rounded-lg bg-white overflow-hidden"
      style={{
        "box-shadow": "0px 10px 30px 2px #00000010",
      }}
    >
      <div className="flex relative items-center rounded-lg bg-white p-2 justify-center h-[175px] w-[85%]">
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
          className="absolute -top-2 left-0 shadow-md shadow-gray-500 w-[3.5rem] h-[3.5rem] rounded-full"
        />
      </div>
      <div className="px-6 w-full flex justify-between h-24 py-2">
        <div
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            overflow: "hidden",
            maxHeight: "7rem",
          }}
          className="font-semibold w-3/4 text-md mb-2"
        >
          {title}
        </div>
      </div>
      <div
        className="px-3 w-full flex flex-col justify-start
       items-start"
      >
        <span className="inline-block px-3 py-1">⭐ {rating}</span>
        <span className="inline-block text-2xl font-bold px-3 py-1 text-black">
          {price}
        </span>
      </div>
      <div className="mt-2 w-full flex justify-between px-6 items-center">
        <span
          className="cursor-pointer text-blue-500"
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
