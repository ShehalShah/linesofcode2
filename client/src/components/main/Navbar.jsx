import React from "react";
import Logo from "../../assets/Logo.svg";
import Logobl from "../../assets/logobl.svg";

const Link = ({ name, link, activeLink, setActiveLink }) => {
  return (
    <div
      onClick={() => {
        setActiveLink(link);
      }}
      className={`cursor-pointer text-lg px-3 py-2 w-44 flex items-center justify-center active:translate-y-1 transition-all duration-200 ${
        activeLink === link ? "text-black font-bold" : "font-bold text-[#1E1E1E80]"
      }`}
    >
      {name}
    </div>
  );
};
const Navbar = ({ activeLink, setActiveLink }) => {
  return (
    <div
      className="bg-white z-50 w-full h-20 fixed flex top-0 left-0 px-10 items-center justify-between"
      style={{
        "box-shadow": "0px 10px 20px 2px #00000017",
      }}
    >
      <img src={Logobl} alt="logo" className="h-8 object-contain" />
      <div className="flex w-full items-center h-full justify-end gap-3">
        <Link
          name="Home"
          link="home"
          activeLink={activeLink}
          setActiveLink={setActiveLink}
        />
        <Link
          name="Search Products"
          link="search"
          activeLink={activeLink}
          setActiveLink={setActiveLink}
        />
        <Link
          name="Favourites"
          link="favourite"
          activeLink={activeLink}
          setActiveLink={setActiveLink}
        />
      </div>
    </div>
  );
};

export default Navbar;
