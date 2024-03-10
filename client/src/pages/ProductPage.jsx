import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import app_api from "../config/ApiConfig";
import StarRatings from "react-star-ratings";
import Icons from "../components/Icons";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from 'react-markdown';
import { useNavigate } from "react-router-dom";
import gradient from "../assets/GreenGradientBox.svg";
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyClbJUJYImDMRjiGZzEGvxwISQE5KEcnaQ");

const ProductPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const url = location.state.url;
  const [data, setData] = useState([]);
  const [ins, setins] = useState(`
  **Insights from the Reviews:**
  
  * **Effectiveness:** The majority of reviewers report experiencing positive results, such as weight loss within a short period of use.
  * **Curbs Hunger:** Several reviewers mention that the capsules help reduce hunger levels, which is essential for weight management.
  * **Natural Ingredients:** The product is praised for containing natural ingredients like Garcinia Cambogia, Green Tea, and Green Coffee, which are known to support weight loss.
  * **Minimal Side Effects:** The reviewers emphasize the absence of negative side effects, which is a common concern with weight loss supplements.
  * **Affordable:** The price of the product is considered reasonable, especially during offers and discounts.
  * **Positive Changes:** Users have noticed improvements in their energy levels and have received compliments on their appearance after using the capsules.
  * **Recommended for Weight Loss:** The reviewers highly recommend the product for individuals looking to shed extra weight.
  * **Long-Term Results:** One reviewer reported losing 10 kgs in 40 days, suggesting that the product may provide sustained weight loss over time.
  
  **Overall Impression:**
  
  Based on the reviews, NutraFirst Keto Nutrition Fat Burner Capsules appear to be a promising product for individuals seeking natural weight management support. Users have reported experiencing positive results, minimal side effects, and overall satisfaction. The inclusion of natural ingredients known to promote weight loss adds credibility to the product's claims. While individual results may vary, the overwhelmingly positive reviews paint a promising picture of this supplement's potential effectiveness.
  `);
  const getData = async () => {
    const data = await app_api.post("products/singleproduct", {
      url: `${url}`,
    });
    console.log(data.data.reviews.join(" "));
    console.log(data.data);
    // fetchGem(data.data);
    setData(data.data);
  };

  useEffect(() => {
    getData();
  }, [url]);

  const fetchGem = async (data) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Analyze the following reviews and give me your insights based on it of a ${
      data.name
    } the reviews are as follows ${data.reviews.join(" ")}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setins(text);
    console.log(text);
  };

  const formatRating = (rating) => {
    let r = parseFloat(rating?.slice(0, 3));
    return parseFloat(r > 5 ? r / 100 : r);
  };

  const processRating = (rating) => {
    if (rating !== "No rating found" && rating) {
      let r = parseFloat(rating.slice(0, 3));
      return (
        <StarRatings
          rating={
            rating !== "No rating found" && rating
              ? parseFloat(r > 5 ? r / 100 : r)
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
    <div className="w-full h-screen flex flex-col overflow-y-auto">
      <div className="w-full min-h-screen px-16 flex gap-2 items-center justify-center bg-">
        <div className="flex flex-col w-1/2 h-[70%] items-center justify-center">
          <div
            className="h-12 w-full cursor-pointer flex items-center justify-start"
            onClick={() => {
              navigate(-1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-arrow-left-short"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
              />
            </svg>
          </div>
          <div className="text-4xl w-full">
            {data?.name?.split(" ").slice(0, 6).join(" ")}
          </div>
          <div className="w-full mt-5 flex items-center justify-between">
            <div className="text-3xl font-bold">{data.price}</div>
            <div className="text-lg flex items-center gap-2">
              {processRating(data.rating)}{" "}
              <span className="h-6">{formatRating(data.rating)}/5.0</span>
            </div>
          </div>
          <div className="text-lg font-bold w-full mt-5 mb-1">Reviews</div>
          <div className="w-full h-56 shadow-md shadow-gray-300 overflow-y-auto rounded-lg border-[1px] border-gray-200 p-4">
            <div className="flex flex-col gap-4 w-full items-center justify-center">
              {data?.reviews?.map((review, index) => (
                <div
                  key={index}
                  className="w-full h-fit flex flex-col items-center justify-center"
                >
                  <div className="max-h-32 w-full flex items-center">
                    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-300">
                      <Icons name="user" height={27} width={27} />
                    </div>
                    <div className="flex w-full flex-col ml-3">
                      <div className="text-lg font-semibold">
                        {getRandomUsername()}
                      </div>
                      <div className="text-md w-full">
                        {removeReadMoreFromStrong(review)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/2 h-[70%] relative flex items-center justify-center">
          <div className="absolute h-full top-0 right-0 flex items-center justify-center">
            <img src={gradient} alt="" />
          </div>
          <div className="bg-white p-3 rounded-xl">
            <img src={data.image} className="w-3/4" />
          </div>
        </div>
      </div>

      <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 m-8">
        <h2 className="text-xl font-semibold mb-4">AI Generated Insights</h2>
        <div className="prose max-w-none">
          <ReactMarkdown>{ins}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
