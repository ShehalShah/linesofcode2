import React from "react";
import search from "../../assets/searchicon.svg";
import Frame19 from "../../assets/Frame19.svg";
import Frame20 from "../../assets/Frame20.svg";
import Frame21 from "../../assets/Frame21.svg";

const Home = () => {
  return <div className="h-full w-full px-16 flex flex-col gap-8 items-center bg-[#FFFFFF] overflow-y-auto">
    <div className="h-96 w-full mt-20 bg-[#C1DCDC] rounded-lg flex ">
      <div className="w-[40%] flex flex-col ml-8 justify-center gap-10 py-12">
        <div>
          <h2 className=" text-3xl font-black">Get the</h2>
          <h2 className=" text-3xl font-black"> BEST DEALS</h2>
        </div>
        <div className="flex">
          <div className="w-32 h-16 border-r border-[#1E1E1E]">
            <h2 className="text-xl font-bold">10+ </h2>
            <h2 className="text-md">Platforms</h2>
          </div>
          <div className="w-32 h-16 ml-8">
            <h2 className="text-xl font-bold">1000+ </h2>
            <h2 className="text-md">Active Users</h2>
          </div>
        </div>

        <div class="relative">
          <input type="text" placeholder="What are you looking for?" class="py-2 pr-8 pl-4 rounded-xl w-[70%] h-16 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200" />
        </div>
      </div>

      <div className="w-[60%]">

      </div>

    </div>

    <div className="w-full grid grid-cols-4">
      <div className="flex flex-col gap-5">
        <div>
          <h2 className=" text-3xl font-black">Best Selling</h2>
          <h2 className=" text-3xl font-black">Products</h2>
        </div>
        <div>
          <h2 className=" text-md text-[#1E1E1E80]">Easiest Way to</h2>
          <h2 className=" text-md text-[#1E1E1E80]">Compare products</h2>
          <h2 className=" text-md text-[#1E1E1E80]">Accross the web</h2>
        </div>
        <div className="relative w-40 bg-[#C1DCDC] h-12 rounded-lg flex items-center justify-between p-8">
          See more
          <svg className="absolute right-3 h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 15.707a1 1 0 01-1.414-1.414L11.586 10 8.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-.707.293z" clip-rule="evenodd" />
          </svg>
        </div>

      </div>
    </div>

    <div className="w-full flex flex-col items-center justify-center">
      <div className=" text-3xl font-black">About us</div>
      <div className="w-full grid grid-cols-3 mt-8 p-6">
        <img src={Frame19} alt="" className=""/>
        <img src={Frame20} alt="" />
        <img src={Frame21} alt="" />
      </div>

    </div>
  </div>;
};

export default Home;
