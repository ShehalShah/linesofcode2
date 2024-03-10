import React from "react";
import Amazon from "../../assets/amazon.png";
import Flipkart from "../../assets/flipkart.png";
import AliExpress from "../../assets/aliexpress.png";
import StarRatings from "react-star-ratings";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import FilledHeart from "../../assets/FilledHeart.svg";
import EmptyHeart from "../../assets/EmptyHeart.svg";

const ImageCard = ({ data }) => {
    const navigate = useNavigate();
    const { title, link, thumbnail, source,source_icon } = data;
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
                    src={thumbnail || "https://source.unsplash.com/random"}
                    alt=""
                />
                {/* <div className="absolute bottom-0 right-0 bg-white p-2 border border-gray-300 rounded-lg"> {source}</div> */}
                <div className="absolute bottom-0 right-0 bg-white p-2 border border-gray-300 rounded-lg">
                    <img src={source_icon} alt="" /> 
                </div>
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
                <span className="inline-block px-3 py-1">⭐ {4.5}</span>
                <span className="inline-block text-2xl font-bold px-3 py-1 text-black">
                </span>
            </div>
            <div className="mt-2 w-full flex justify-between px-6 items-center">
                <span
                    className="cursor-pointer text-blue-500"
                    onClick={() => {
                        navigate("/product", { state: { link } });
                    }}
                >
                    View More
                </span>
                <a href={link} target="_blank">
                <span
                    className="cursor-pointer hover:underline"
                >
                    Go to site &gt;
                </span>
                </a>

            </div>
        </div>
    );
};

export default ImageCard;
