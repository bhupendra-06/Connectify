import React from "react";
import "./Header.css";
import { IoSearch } from "react-icons/io5";
import { LuHome } from "react-icons/lu";
import { MdOutlineElectricBolt } from "react-icons/md";
import { LuVideo } from "react-icons/lu";
import { LuUser } from "react-icons/lu"; // this is user icon
import { HiUserGroup } from "react-icons/hi2";
import { LuShoppingBag } from "react-icons/lu";
import { LuBell } from "react-icons/lu";
import { BiComment } from "react-icons/bi";
import { SlSettings } from "react-icons/sl";
import { CgMenuRight } from "react-icons/cg";
import { FaCircleUser } from "react-icons/fa6";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link, NavLink } from "react-router-dom";

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';

// gsap.registerPlugin(useGSAP);

const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };


  // GSAP ANIMATION
  useGSAP(() => {
    gsap.to(".gsapRotate", {
      rotate: 90,
      duration: 2,
      delay: 0,
      ease: "none",
      repeat: Infinity,
    });
  }, []);
  return (
    <>
      <header className="fixed top-0 w-full pl-5 py-2 md:py-4 flex items-center bg-white justify-between shadow-sm shadow-gray-300 z-20">
        <Link
          to="/home"
          className="logo text-2xl md:text-3xl font-bold text-blue-600"
        >
          Connectify.
        </Link>
        <div className="2 w-full flex justify-between">
          <div className="sm:pl-20 flex items-center">
            <div className="search-box hidden lg:flex">
              <IoSearch className="icon text-xl text-gray-400" />
              <input type="search" placeholder="Start typing to search...." />
            </div>
            <ul className="hidden xl:flex">
              <li className="icon-gola text-blue-600 bg-[#d2e3ff] rounded-full">
                <NavLink to="/home">
                  <LuHome className="icon text-blue-600" />
                </NavLink>
              </li>
              <li className="icon-gola">
                <NavLink to="">
                  <MdOutlineElectricBolt className="icon" />
                </NavLink>
              </li>
              <li className="icon-gola">
                <NavLink to="">
                  <LuVideo className="icon" />
                </NavLink>
              </li>
              <li className="icon-gola">
                <NavLink>
                  <HiUserGroup className="icon" />
                </NavLink>
              </li>
              <li onClick={handleLogout}  className="icon-gola">
                <NavLink>
                  <LuShoppingBag className="icon" />
                </NavLink>
              </li>

            </ul>
          </div>
          <ul className="px-2 flex items-center justify-start *:lg:text-3xl">
            <Link to="settings">
              <SlSettings className="icon gsapRotate text-blue-600 hidden sm:inline-block" />
            </Link>
            <BiComment className="icon text-blue-600" />
            <LuBell className="icon text-blue-600" />
            <CgMenuRight className="icon text-3xl lg:hidden" />
            <FaCircleUser className="icon text-red-700 hidden lg:block" />
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
