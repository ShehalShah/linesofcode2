import React, { useEffect, useState } from "react";
import Home from "../components/main/Home";
import Search from "../components/main/Search";
import Favourite from "../components/main/Favourite";
import Watch from "../components/main/Watch";
import Navbar from "../components/main/Navbar";

const MainModule = () => {
  const [activeLink, setActiveLink] = useState("home");

  const activeSection = () => {
    switch (activeLink) {
      case "home":
        return <Home />;
      case "search":
        return <Search />;
      case "favourite":
        return <Favourite />;
      case "watch":
        return <Watch />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Navbar activeLink={activeLink} setActiveLink={setActiveLink} />
      {activeSection()}
    </div>
  );
};

export default MainModule;
