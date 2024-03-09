import React, { useEffect, useState } from 'react'
import Banner from '../components/auth/Banner'
import Navbar from '../components/auth/Navbar'
import MoreDetails from '../components/auth/MoreDetails'
import SplitSection from '../components/SplitSection'
import MobileApp from '../components/auth/MobileApp'

const AuthModule = () => {
    const [activeLink, setActiveLink] = useState("banner");
    useEffect(() => {
      const element = document.getElementById(activeLink);
      element.scrollIntoView({ behavior: "smooth" });
    }, [activeLink]);

    useEffect(() => {
      const handleScroll = () => {
        const banner = document.getElementById("banner");
        const details = document.getElementById("details");
        const mobile = document.getElementById("mobile");
        if (
          window.scrollY < details.offsetTop - 300 &&
          window.scrollY > banner.offsetTop - 300
        ) {
          setActiveLink("banner");
        } else if (
          window.scrollY < mobile.offsetTop - 300 &&
          window.scrollY > details.offsetTop - 300
        ) {
          setActiveLink("details");
        } else {
          setActiveLink("mobile");
        }
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  return (
    <div className="w-full h-screen overflow-hidden">
      <Navbar activeLink={activeLink} setActiveLink={setActiveLink} />
      <Banner />
    </div>
  );
}

export default AuthModule