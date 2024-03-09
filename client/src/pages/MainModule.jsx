import React, { useEffect, useState } from "react";
import Home from "../components/main/Home";
import Search from "../components/main/Search";
import Favourite from "../components/main/Favourite";
import Navbar from "../components/main/Navbar";
import app_api from "../config/ApiConfig";
import toast from "react-hot-toast";
import { debounce } from "lodash";

const MainModule = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [search, setSearch] = useState("house products");
  const [data, setData] = useState([]);
  const getData = debounce(async () => {
    const data = await app_api.post("products/search", {
      query: `${search}`,
    });
    setData(data.data.combinedProducts);
  }, 3000);

  useEffect(() => {
    getData();
    return () => {
      getData.cancel();
    };
  }, [search]);

  const activeSection = () => {
    switch (activeLink) {
      case "home":
        return <Home />;
      case "search":
        return <Search data={data} setSearch={setSearch} search={search} />;
      case "favourite":
        return <Favourite />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="w-full bg-gradient-to-tl h-full flex items-center justify-center">
      <Navbar activeLink={activeLink} setActiveLink={setActiveLink} />
      {activeSection()}
    </div>
  );
};

export default MainModule;
