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
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();
  const goToSettings = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        navigate("/settings");
      });
    } else {
      navigate("/settings");
    }
  };

  return (
    <>
      <header className="fixed top-0 w-full pl-5 py-2 md:py-4 flex items-center bg-white justify-between shadow-sm shadow-gray-300 z-10">
        {/* Logo Section */}
        <NavLink
          to="/"
          className="logo text-2xl md:text-3xl font-bold text-primaryColor select-none"
        >
          Connectify.
        </NavLink>

        {/* Navigation and Search Section */}
        <div className="w-full flex justify-between">
          <div className="sm:pl-20 flex items-center">
            {/* Search Box */}
            <div className="search-box hidden lg:flex items-center">
              <IoSearch className="icon text-xl text-gray-400" />
              <input
              id="search"
                type="search"
                placeholder="Start typing to search..."
                className="ml-2 border-b focus:outline-none"
              />
            </div>

            {/* Navigation Icons */}
            <ul className="hidden xl:flex space-x-4 ml-6">
              <li className="icon-gola text-primaryColor bg-[#d2e3ff] rounded-full">
                <NavLink to="/">
                  <LuHome className="icon m-2 text-primaryColor" />
                </NavLink>
              </li>
              <li className="icon-gola">
                <NavLink to="/login">
                  <MdOutlineElectricBolt className="icon m-2" />
                </NavLink>
              </li>
              <li className="icon-gola">
                <NavLink to="/signup">
                  <LuVideo className="icon m-2" />
                </NavLink>
              </li>
              <li className="icon-gola">
                <NavLink>
                  <HiUserGroup className="icon m-2" />
                </NavLink>
              </li>
              <li className="icon-gola">
                <NavLink>
                  <FiLogOut className="icon m-2" />
                </NavLink>
              </li>
            </ul>
          </div>

          {/* User Actions Section on right side*/}
          <ul className="sm:px-2 flex items-center sm:space-x-4">
            <li>
              <NavLink>
                <LuBell className="icon text-primaryColor hidden sm:inline-block" />
              </NavLink>
            </li>
            <li>
              <NavLink>
                <BiComment className="icon text-primaryColor hidden sm:inline-block" />
              </NavLink>
            </li>
            <li onClick={goToSettings} className="cursor-pointer">
              <SlSettings className="icon gsapRotate text-primaryColor" />
            </li>
            <li onClick={() => navigate(`/profile/${MyOwnerId}`)}>
              {avatar ? (
                <img
                  src={avatar}
                  alt="User Avatar"
                  className="mx-3 w-10 h-10 object-cover rounded-full border border-blue-200 shadow-sm"
                />
              ) : (
                <FaCircleUser className="mx-2 text-gray-400 text-4xl" />
              )}
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
