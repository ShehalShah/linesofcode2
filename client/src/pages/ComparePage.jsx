import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import StarRatings from "react-star-ratings";
import app_api from "../config/ApiConfig";
import Icons from "../components/Icons";
import Navbar from "../components/main/Navbar";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ComparePage = () => {
  const location = useLocation();
  const productsToCompare = location.state.productsToCompare;

  const getReviews = async (url) => {
    return await app_api.post("products/singleproduct", {
      url: `${url}`,
    });
  };

  const genAI = new GoogleGenerativeAI("AIzaSyClbJUJYImDMRjiGZzEGvxwISQE5KEcnaQ");

  const [mainData, setMainData] = useState([]);

  useEffect(() => {
    productsToCompare.forEach(async (product) => {
      const r = await getReviews(product.url);
      setMainData((prev) => {
        const isProductExist = prev.some((p) => p.title === product.title);
        if (!isProductExist) {
          return [
            ...prev,
            {
              title: product.title,
              rating: product.rating,
              price: product.price,
              image: product.image,
              reviews: r.data.reviews,
            },
          ];
        }
        return prev;
      });
    });
  }, [productsToCompare]);

  const processRating = (rating) => {
    if (rating !== "No rating found" && rating) {
      return (
        <StarRatings
          rating={
            rating !== "No rating found" && rating ? parseFloat(rating) : 0
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

  useEffect(() => {
    console.log(mainData);
  }, [mainData]);

  const fetchGem = async (data) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Analyze the following reviews and give me your insights based on it of a ${data.name} the reviews are as follows ${data.reviews.join(" ")}`

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setins(text)
    console.log(text);
  };

  return (
    <div className="w-full bg-gradient-to-tl h-full flex items-center justify-center">
      <Navbar />
      <div className="w-full pb-10 h-full flex items-center justify-center bg-white overflow-y-auto">
        <div className="w-full h-full mt-40 flex-1 overflow-y-auto  border-x border-gray-300 rounded-lg">
          <div className="w-full h-full flex items-start justify-center overflow-y-auto">
            {mainData?.map((product, index) => (
              <div
                key={index}
                className="w-full h-full p-4 flex flex-col items-center justify-center border-r border-gray-300 overflow-y-auto"
              >
                <div className="w-1/2 h-[70%] flex items-center justify-center">
                  <div className="bg-white p-3 rounded-xl h-[20rem] w-[20rem] flex items-center justify-center">
                    <img src={product.image} />
                  </div>
                </div>
                <div className="flex flex-col w-1/2 h-[70%] items-center justify-center">
                  <div className="text-xl w-full font-semibold">{product.title.split(' ').slice(0, 6).join(' ')}...</div>

                  <div className="text-lg flex w-full ">
                    {processRating(parseFloat(product.rating))}
                  </div>
                  <div className="text-3xl font-bold w-full mt-5 pb-5 border-b border-gray-200">
                    {product.price}
                  </div>
                  <div className="text-lg font-bold w-full my-5">Reviews</div>
                  <div className="w-full h-[10rem] overflow-y-auto">
                    <div className="flex flex-col gap-4 w-full items-center justify-center">
                      {product?.reviews?.map((review, index) => (
                        <div
                          key={index}
                          className="w-full h-fit flex flex-col items-center justify-center"
                        >
                          <div className="h-12 w-full flex items-center">
                            <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-300">
                              <Icons name="user" height={27} width={27} />
                            </div>
                            <div className="text-md ml-3">
                              {getRandomUsername()}
                            </div>
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
