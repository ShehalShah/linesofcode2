import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import app_api from "../config/ApiConfig";
import StarRatings from "react-star-ratings";
import Icons from "../components/Icons";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from 'react-markdown';

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyClbJUJYImDMRjiGZzEGvxwISQE5KEcnaQ");

const ProductPage = () => {
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

    const prompt = `Analyze the following reviews and give me your insights based on it of a ${data.name} the reviews are as follows ${data.reviews.join(" ")}`

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setins(text)
    console.log(text);
  };

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
    <div className="w-full h-full flex flex-col overflow-y-auto">
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

      <div class="bg-gray-100 border border-gray-300 rounded-lg p-6 m-8">
        <h2 class="text-xl font-semibold mb-4">AI Generated Insights</h2>
        <div className="prose max-w-none">
          <ReactMarkdown>{ins}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
