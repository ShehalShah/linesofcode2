import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import BannerImage from "../../assets/Banner.svg";

const Banner = () => {
  const [authType, setAuthType] = useState("login");
  return (
    <div
      id="banner"
      className="w-full h-screen px-16 bg-[#6133B4] flex items-center justify-evenly"
    >
      <img src={BannerImage} alt="" className="w-72 h-fit" />
      <div className="w-1/3 h-[27rem] overflow-y-auto p-3 bg-white rounded-lg shadow-xl shadow-[#36205D]">
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
