import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import BannerImage from "../../assets/Banner.svg";
import Illustration from "../../assets/Illus.svg";

const Banner = () => {
  const [authType, setAuthType] = useState("login");
  return (
    <div
      id="banner"
      className="w-full relative h-screen px-16 flex items-center justify-evenly"
    >
      <img src={BannerImage} alt="" className="w-full absolute h-fit z-[-1]" />
      <div className="w-full h-full flex flex-col justify-center items-center relative">
        <img
          src={Illustration}
          alt=""
          className="w-[20rem] h-fit object-contain"
        />
        <div className="text-5xl text-white font-semibold">Scrape it out</div>
      </div>
      <div className="w-full h-[27rem] shadow-lg shadow-[#531889] overflow-y-auto rounded-xl p-3 bg-white">
        {authType === "login" ? (
          <Login setAuthType={setAuthType} />
        ) : (
          <Register setAuthType={setAuthType} />
        )}
      </div>
    </div>
  );
};

export default Banner; 
