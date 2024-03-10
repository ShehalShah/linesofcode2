import React from "react";
import Navbar from "../components/main/Navbar";
import ImageCard from "../components/main/ImageCard";
import { useLocation,useNavigate } from "react-router-dom";

const ImageAnalyzer = () => {
  // const imageanalyzed = JSON.parse(localStorage.getItem('watchlist')); 
  const navigate = useNavigate();
  const location = useLocation();
  const imageanalyzed = location.state.data;

  console.log(imageanalyzed);
  return <div className="w-full relative h-full flex items-center justify-center">
  <Navbar />
  <div className="w-full h-full pt-28 pb-10 overflow-y-auto gap-3">
      <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="h-full w-full grid grid-cols-3 gap-14 overflow-y-auto px-32 py-8">
          {imageanalyzed?.visual_matches?.map((item, index) => {
            return (
              <ImageCard
                key={index}
                data={item}
              />
            );
          })}
        </div>
      </div>
      </div>
  </div>;
};

export default ImageAnalyzer;
