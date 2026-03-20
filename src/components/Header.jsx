import React, { useState } from "react";
import {
  FaSearch,
  FaHome,
  FaUsers,
  FaSignOutAlt,
  FaBell,
  FaCog,
  FaUserCircle,
} from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import SearchUser from "./search/SearchUser";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";

const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // avatar + id from cookies
  const avatar = Cookies.get("avatar");
  const MyOwnerId = Cookies.get("MyOwnerId");

  // rotate settings icon
  useGSAP(() => {
    gsap.to(".gsapRotate", {
      rotate: 90,
      duration: 2,
      repeat: Infinity,
      ease: "none",
    });
  }, []);

  const goToSettings = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => navigate("/settings"));
    } else {
      navigate("/settings");
    }
  };

  return (
    <>
      <header className="fixed top-0 w-full px-4 py-2 md:py-3 flex items-center bg-white/40 backdrop-blur-md justify-between shadow-md z-10 rounded-b-2xl">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 select-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="w-8 h-8 rounded-md"
          >
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0" stopColor="#6366f1" />
                <stop offset="1" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <rect width="48" height="48" rx="12" fill="url(#g1)" />
            <text
              x="50%"
              y="54%"
              textAnchor="middle"
              fontSize="20"
              fontWeight="700"
              fill="white"
            >
              B
            </text>
          </svg>
          <span className="text-xl md:text-2xl font-bold text-gray-800">Connectify</span>
        </Link>

        {/* Search bar (desktop) */}
        <div className="hidden lg:flex items-center flex-1 mx-8">
          <div className="flex items-center w-full max-w-md bg-white/70 rounded-full px-3 py-1 shadow-sm border">
            <FaSearch className="text-gray-400" />
            <input
              type="search"
              placeholder="Search..."
              className="ml-2 flex-1 bg-transparent focus:outline-none text-sm"
              onClick={() => setOpen(true)}
            />
          </div>
        </div>

        {/* Navigation + actions */}
        <div className="flex items-center gap-4">
          <nav className="hidden xl:flex gap-3">
            <NavLink to="/" className="p-2 rounded-full hover:bg-indigo-100">
              <FaHome className="text-primaryColor" />
            </NavLink>
            <NavLink to="/groups" className="p-2 rounded-full hover:bg-indigo-100">
              <FaUsers />
            </NavLink>
            <button className="p-2 rounded-full hover:bg-indigo-100">
              <FaSignOutAlt />
            </button>
          </nav>

          <button className="hidden sm:block p-2 rounded-full hover:bg-indigo-100">
            <FaBell className="text-primaryColor" />
          </button>

          <button onClick={goToSettings} className="p-2 rounded-full hover:bg-indigo-100">
            <FaCog className="gsapRotate text-primaryColor" />
          </button>

          <div onClick={() => navigate(`/profile/${MyOwnerId}`)} className="cursor-pointer">
            {avatar ? (
              <img
                src={avatar}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border border-indigo-200 shadow-sm"
              />
            ) : (
              <FaUserCircle className="text-gray-400 text-3xl" />
            )}
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <Dialog open={open} onClose={setOpen} className="relative z-20">
        <DialogBackdrop className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 z-30 flex items-center justify-center">
          <DialogPanel className="bg-white p-4 rounded-lg shadow-xl w-full max-w-lg">
            <SearchUser />
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default Header;
