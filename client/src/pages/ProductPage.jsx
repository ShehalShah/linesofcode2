import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import app_api from "../config/ApiConfig";
import StarRatings from "react-star-ratings";
import Icons from "../components/Icons";

const ProductPage = () => {
  const location = useLocation();
  const url = location.state.url;
  const [data, setData] = useState([]);
  const getData = async () => {
    const data = await app_api.post("products/singleproduct", {
      url: `${url}`,
    });
    console.log(data.data);
    setData(data.data);
  };

  useEffect(() => {
    getData();
  }, [url]);

  const processRating = (rating) => {
    if (rating !== "No rating found" && rating) {
      return (
        <StarRatings
          rating={
            rating !== "No rating found" && rating
              ? parseFloat(rating) / 100
              : 0
          }
          numberOfStars={5}
          starDimension="20px"
          starSpacing="2px"
          starRatedColor="#FFD700"
          starEmptyColor="#d3d3d3"
        />
      );
    } else {
      return <div className="text-lg">No rating found</div>;
    }
  };

  const randomUsernames = [
    "John Doe",
    "John Smith",
    "John Johnson",
    "John Brown",
    "John Williams",
    "Jane Jones",
    "Jane Davis",
    "Jane Miller",
    "Jane Wilson",
    "Jane Moore",
  ];

  const getRandomUsername = () => {
    return randomUsernames[Math.floor(Math.random() * randomUsernames.length)];
  };

  const removeReadMoreFromStrong = (text) => {
    return text.replace(/READ MORE:/g, "");
  };

  return (
    <div className="w-full h-full px-16 flex gap-2 items-center justify-center bg-gradient-to-tl">
      <div className="w-1/2 h-[70%] flex items-center justify-center">
        <div className="bg-white p-3 rounded-xl">
          <img src={data.image} />
        </div>
      </div>
      <div className="flex flex-col w-1/2 h-[70%] items-center justify-center">
        <div className="text-xl w-full">{data.name}</div>

        <div className="text-lg flex w-full">{processRating(data.rating)}</div>
        <div className="text-3xl font-bold w-full mt-5">{data.price}</div>
        <div className="text-lg font-bold w-full my-5">Reviews</div>
        <div className="w-full h-56 overflow-y-auto">
          <div className="flex flex-col gap-4 w-full items-center justify-center">
            {data?.reviews?.map((review, index) => (
              <div
                key={index}
                className="w-full h-fit flex flex-col items-center justify-center"
              >
                <div className="h-12 w-full flex items-center">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-300">
                    <Icons name="user" height={27} width={27} />
                  </div>
                  <div className="text-md ml-3">{getRandomUsername()}</div>
                </div>
                <div className="text-md w-full">
                  {removeReadMoreFromStrong(review)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
