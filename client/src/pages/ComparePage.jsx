import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import StarRatings from "react-star-ratings";
import app_api from "../config/ApiConfig";
import Icons from "../components/Icons";
import Navbar from "../components/main/Navbar";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from 'react-markdown';
import { useNavigate } from "react-router-dom";

const ComparePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const productsToCompare = location.state.productsToCompare;

  const [ins, setins] = useState(`
  **1. GharSoaps Sandal Wood And Saffron Soap**

  * **Rating:** 4 out of 5
  * **Price:** ₹848 for a pack of 3 soaps
  * **Reviews:**
      * Positive reviews: 5, 2
      * Negative reviews: 3
  
  **2. NutraFirst Keto Nutrition Fat Burner Capsules**
  
  * **Rating:** 4 out of 5
  * **Price:** ₹409 for 1 bottle
  * **Reviews:**
      * Positive reviews: 7, 10, 1, 5, 6, 11, 2, 9, 12, 8, 3
      * Negative reviews: 4
  
  **3. A M Enterprises Wall Shelf**
  
  * **Rating:** 3.8 out of 5
  * **Price:** ₹790 for a set of 3 shelves
  * **Reviews:**
      * Positive reviews: 5, 8, 10, 11
      * Negative reviews: 6, 7, 12
  
  **Analysis:**
  
  **1. Price:** The GharSoaps Sandal Wood And Saffron Soap is the most expensive of the three products, followed by the A M Enterprises Wall Shelf and the NutraFirst Keto Nutrition Fat Burner Capsules.
  
  **2. Reviews:** The NutraFirst Keto Nutrition Fat Burner Capsules have the most positive reviews, followed by the GharSoaps Sandal Wood And Saffron Soap and the A M Enterprises Wall Shelf. However, the A M Enterprises Wall Shelf has the most negative reviews.
  
  **3. Quality:** The GharSoaps Sandal Wood And Saffron Soap is made with natural ingredients, which may be beneficial for skin health. The NutraFirst Keto Nutrition Fat Burner Capsules contain a blend of ingredients that are believed to promote weight loss. The A M Enterprises Wall Shelf is made of MDF, which is a type of engineered wood.
  
  **4. Suitability:** The GharSoaps Sandal Wood And Saffron Soap is suitable for all skin types. The NutraFirst Keto Nutrition Fat Burner Capsules are suitable for people who are looking to lose weight. The A M Enterprises Wall Shelf is suitable for displaying small items or decorative objects.
  
  **Insights:**
  
  The GharSoaps Sandal Wood And Saffron Soap is a luxurious soap that is made with natural ingredients. It is the most expensive of the three products, but it also has the highest rating. The NutraFirst Keto Nutrition Fat Burner Capsules are a popular weight loss supplement. They have a high rating and many positive reviews. The A M Enterprises Wall Shelf is a budget-friendly option that is suitable for displaying small items. It has a lower rating than the other two products, but it also has some positive reviews.
  
  Overall, the three products are very different and each one has its own advantages and disadvantages. The best product for you will depend on your individual needs and preferences.
  `);

  const getReviews = async (url) => {
    return await app_api.post("products/singleproduct", {
      url: `${url}`,
    });
  };

  const genAI = new GoogleGenerativeAI(
    "AIzaSyClbJUJYImDMRjiGZzEGvxwISQE5KEcnaQ"
  );

  const [mainData, setMainData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const promises = productsToCompare.map(async (product) => {
        const r = await getReviews(product.url);
        return {
          title: product.title,
          rating: product.rating,
          price: product.price,
          image: product.image,
          reviews: r.data.reviews,
        };
      });

      const results = await Promise.all(promises);

      setMainData((prev) => {
        const newData = results.filter((result) => {
          return !prev.some((p) => p.title === result.title);
        });
        return [...prev, ...newData];
      });
    };

    fetchData();
  }, [productsToCompare]);

  useEffect(() => {
    if (mainData.length !== 0) {
      // fetchGem(mainData)
    }
  }, [mainData]);

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

    // const prompt = `Analyze the following reviews and give me your insights based on it of a ${data.name} the reviews are as follows ${data.reviews.join(" ")}`
    // const prompt = ``

    let prompt = `Compare the following products give me detailed analysis and insights compare them with each other the name, price and reviews are as follow:\n\n`;

    data.forEach((product, index) => {
      prompt += `${index + 1}. title: ${product.title}\n`;
      prompt += `rating : ${product.rating}`;
      prompt += `price : ${product.price}`;
      prompt += `reviews : ${product.reviews.join(" ")}`;
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setins(text);
    console.log(text);
  };

  return (
    <div className="h-screen w-full items-center justify-center overflow-y-auto gap-5">
      <div className="w-full px-10 h-full flex items-center justify-center">
        <Navbar />
        <div className="w-full min-h-screen mt-96 flex items-center justify-center bg-white overflow-y-auto">
          <div className="w-full h-full flex-1 overflow-y-auto rounded-lg">
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
            <div className="w-full h-full flex items-start justify-center overflow-y-auto">
              {mainData?.map((product, index) => (
                <div
                  key={index}
                  className="pb-10 w-full h-full p-4 flex flex-col items-center justify-center overflow-y-auto"
                >
                  <div className="w-full h-[70%] flex items-center justify-center">
                    <div className="bg-white p-3 rounded-xl h-[20rem] w-[20rem] flex items-center justify-center">
                      <img
                        src={product.image}
                        className="object-contain w-full h-[16rem]"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col w-full h-[70%] items-center justify-center">
                    <div className="text-xl w-full font-semibold">
                      {product.title.split(" ").slice(0, 6).join(" ")}...
                    </div>

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
      <div className="w-full pb-10 flex items-center justify-center">
        <div className="bg-gray-100 h-fit w-[90%] border border-gray-300 rounded-lg p-6 mt-80">
          <h2 className="text-3xl font-semibold mb-4">AI Generated Insights</h2>
          <div className="prose max-w-none">
            <ReactMarkdown>{ins}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
