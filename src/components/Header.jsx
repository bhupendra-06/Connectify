import React from "react";
import "./Header.css";
import { IoSearch } from "react-icons/io5";
import { LuHome } from "react-icons/lu";
import { MdOutlineElectricBolt } from "react-icons/md";
import { LuVideo } from "react-icons/lu";
import { LuUser } from "react-icons/lu";// this is user icon
import { HiUserGroup } from "react-icons/hi2";
import { LuShoppingBag } from "react-icons/lu";
import { LuBell } from "react-icons/lu";
import { BiComment } from "react-icons/bi";
import { SlSettings } from "react-icons/sl";
import { FaCircleUser } from "react-icons/fa6";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// gsap.registerPlugin(useGSAP);

const Header = () => {
  // GSAP ANIMATION
  useGSAP(() => {
    gsap.to(".gsapRotate", { 
      rotate: 360,
      duration: 2.2,
      delay: 0,
      ease: "none",
      repeat: Infinity,
     });
  }, []);
  return (
    <>
      <header className="w-full pl-5 py-2 md:py-4 flex items-center bg-white justify-between shadow-xl shadow-gray-100">
        <div className="logo text-2xl md:text-3xl font-bold text-blue-600">
          Connectify.
        </div>
        <div className="2 w-full flex justify-between">
          <div className="sm:pl-20 flex items-center">
            <div className="search-box hidden lg:flex">
              <IoSearch className="icon text-xl text-gray-400" />
              <input type="search" placeholder="Start typing to search...." />
            </div>
            <ul className="hidden xl:flex">
              <li className="icon-gola text-blue-600 bg-[#d2e3ff]">
                <LuHome className="icon text-blue-600" />
              </li>
              <li className="icon-gola">
                <MdOutlineElectricBolt className="icon" />
              </li>
              <li className="icon-gola">
                <LuVideo className="icon" />
              </li>
              <li className="icon-gola">
                <HiUserGroup className="icon" />
              </li>
              <li className="icon-gola">
                <LuShoppingBag className="icon" />
              </li>
            </ul>
          </div>
          <ul className="px-2 flex items-center">
            <LuBell className="icon mx-3 text-blue-600 lg:text-3xl" />
            <BiComment className="icon mx-3 text-blue-600 lg:text-3xl" />
            <SlSettings className="icon gsapRotate mx-3 text-blue-600 lg:text-3xl" />
            <FaCircleUser className="icon mx-3 text-red-700 lg:text-3xl" />
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
