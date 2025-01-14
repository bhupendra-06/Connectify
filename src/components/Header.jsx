import React, { useState } from "react";
import "./Header.css";
import { IoSearch } from "react-icons/io5";
import { LuHome } from "react-icons/lu";
import { MdOutlineElectricBolt } from "react-icons/md";
import { LuVideo } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import { HiUserGroup } from "react-icons/hi2";
import { LuBell } from "react-icons/lu";
import { BiComment } from "react-icons/bi";
import { SlSettings } from "react-icons/sl";
import { FaCircleUser } from "react-icons/fa6";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";

const Header = () => {
  // getting avatar and owner id to fetch user profile
  const avatar = Cookies.get("avatar");
  const MyOwnerId = Cookies.get("MyOwnerId");

  // Using gsap animation to rotate settings icon
  useGSAP(() => {
    gsap.to(".gsapRotate", {
      rotate: 90,
      duration: 2,
      delay: 0,
      ease: "none",
      repeat: Infinity,
    });
  }, []);

  const handleClick = ()=>{
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        navigate(`/profile/${post.owner}`);
      });
    } else {
      navigate(`/profile/${post.owner}`); // Fallback for unsupported browsers
    }
  }

  return (
    <>
      <header className="fixed top-0 w-full pl-5 py-2 md:py-4 flex items-center bg-white justify-between shadow-sm shadow-gray-300 z-10">
        <NavLink
          to="/"
          className="logo text-2xl md:text-3xl font-bold text-blue-600 select-none"
        >
          Connectify.
        </NavLink>
        <div className="2 w-full flex justify-between">
          <div className="sm:pl-20 flex items-center">
            <div className="search-box hidden lg:flex">
              <IoSearch className="icon text-xl text-gray-400" />
              <input type="search" placeholder="Start typing to search...." />
            </div>
            <ul className="hidden xl:flex">
              <li className="icon-gola text-blue-600 bg-[#d2e3ff] rounded-full">
                <NavLink to="/">
                  <LuHome className="icon text-blue-600" />
                </NavLink>
              </li>
              <li className="icon-gola">
                <NavLink to="/login">
                  <MdOutlineElectricBolt className="icon" />
                </NavLink>
              </li>
              <li className="icon-gola">
                <NavLink to="/signup">
                  <LuVideo className="icon" />
                </NavLink>
              </li>
              <li className="icon-gola">
                <NavLink>
                  <HiUserGroup className="icon" />
                </NavLink>
              </li>
              <li className="icon-gola">
                <NavLink>
                  <FiLogOut className="icon" />
                </NavLink>
              </li>
            </ul>
          </div>
          <ul className="sm:px-2 flex items-center sm:*:mx-2 *:lg:text-3xl">
            <NavLink>
              <LuBell className="icon text-blue-600 hidden sm:inline-block" />
            </NavLink>
            <NavLink>
              <BiComment className="icon text-blue-600 hidden sm:inline-block" />
            </NavLink>
            <NavLink to={"/settings"}>
              <SlSettings className="icon gsapRotate text-blue-600" />
            </NavLink>
            <NavLink to={`/profile/${MyOwnerId}`}>
              {avatar ? (
                <img
                  src={avatar}
                  className="mx-3 w-10 h-10 object-cover rounded-full border border-blue-200 shadow-sm"
                />
              ) : (
                <FaCircleUser className="mx-2 text-gray-400 text-4xl" />
              )}
            </NavLink>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
