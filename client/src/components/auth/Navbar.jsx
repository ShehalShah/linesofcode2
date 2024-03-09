import React from "react";
import Logo from "../../assets/Logo.svg";

const Link = ({ name, link, activeLink, setActiveLink }) => {
  return (
    <div
      onClick={() => {
        setActiveLink(link);
      }}
      className={`cursor-pointer text-lg px-3 py-2 active:translate-y-1 transition-all duration-200 ${
        activeLink === link ? "text-[#FFD700] font-bold" : "text-white"
      }`}
    >
      {name}
    </div>
  );
};
const Navbar = ({ activeLink, setActiveLink }) => {
  return (
    <div className="bg-transparent z-50 w-full h-20 fixed flex top-0 left-0 px-10 items-center justify-between">
      <img src={Logo} alt="logo" className="h-8 object-contain" />
      <div className="flex w-full items-center h-full justify-end gap-3">
        <Link
          name="Get Started"
          link="banner"
          activeLink={activeLink}
          setActiveLink={setActiveLink}
        />
        <Link
          name="Learn More"
          link="details"
          activeLink={activeLink}
          setActiveLink={setActiveLink}
        />
        <Link
          name="Mobile Apps"
          link="mobile"
          activeLink={activeLink}
          setActiveLink={setActiveLink}
        />
      </div>
    </div>
  );
};

export default Navbar;
