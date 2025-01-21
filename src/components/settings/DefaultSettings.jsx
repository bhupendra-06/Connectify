import React from "react";
import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { LuHome } from "react-icons/lu";
import { PiGlobeSimpleBold } from "react-icons/pi";
import { GrLocation } from "react-icons/gr";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa";
import { FiHelpCircle } from "react-icons/fi";
import { TbLogout } from "react-icons/tb";
import { PiCaretRightThin } from "react-icons/pi";
import { RiAccountCircleLine } from "react-icons/ri";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function DefaultSettings() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Set the loaded state to true after the component has mounted
    setLoaded(true);
  }, []);

  const navigate = useNavigate();

  const handleLogout = async () => {
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      console.error("Access token not found. User might not be logged in.");
      return;
    }

    try {
      const response = await fetch(
        "https://connectify-backend-2uq0.onrender.com/api/v1/users/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      console.log("Logout Response:", data);

      if (response.status === 200) {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        navigate("/login");
      } else {
        console.error("Logout failed:", data.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div
      className={`mx-auto sm:mt-2 lg:pl-48 max-w-[900px] rounded overflow-hidden bg-white select-none ${
        loaded ? 'translate-x-0' : 'translate-x-full'
      } transition-all duration-300 ease-out`}
    >
      <div className="align-left mt-3">
        <div className="flex items-center px-2 sm:px-7">
          <Link onClick={()=>{navigate(-1)}}>
            <GoArrowLeft className="inline-block m-1" size={30} />
          </Link>
          <h1 className="pl-4 text-xl sm:text-3xl font-bold">Settings</h1>
        </div>
      </div>
      <div className="w-full m-auto mb-3 px-2 sm:px-7">
        <div>
          <div className="text-[#ADB5BD] text-[13px] p-3 font-bold text-start ml-2">
            General
          </div>
          <div className="ml-4 flex flex-col gap-3 pb-4">
            <Link to="/account-info" className="flex relative">
              <div className="inline-block p-[10px]  rounded-full bg-gradient-to-r from-[#0575e6] to-[#021b79] text-white font-bold">
                <LuHome className="font-bold" size={25} />
              </div>
              <div className="p-2  font-bold hover:text-[#0055ff]">
                Account Information
              </div>
              <PiCaretRightThin
                size={22}
                className="text-[#596067] absolute right-0 top-3"
              />
            </Link>
            <div className="h-px w-full bg-slate-300"></div>
            <div className="flex relative">
              <div className="inline-block  p-[10px] rounded-full  bg-gradient-to-r from-[#f2994a] to-[#f2c94c] text-white font-bold">
                <GrLocation className="font-bold" size={25} />
              </div>
              <div className="p-2  font-bold hover:text-[#0055ff]">
                Saved Address
              </div>
              <PiCaretRightThin
                size={22}
                className="text-[#596067] absolute right-0 top-3"
              />
            </div>
            <div className="h-px w-full bg-slate-300"></div>
            <div className="flex relative">
              <div className="inline-block  p-[10px]  rounded-full bg-gradient-to-r from-[#e44d26] to-[#F16550] text-white font-bold">
                <PiGlobeSimpleBold className="font-bold" size={25} />
              </div>
              <div className="p-2  font-bold hover:text-[#0055ff]">
                Social Account
              </div>
              <PiCaretRightThin
                size={22}
                className="text-[#596067] absolute right-0 top-3"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="text-[#ADB5BD] text-[13px] p-3 font-bold text-start ml-2">
            Account
          </div>
          <div className="ml-4 flex flex-col gap-3 pb-4">
            <div className="flex relative">
              <div className="inline-block p-[10px]  rounded-full bg-gradient-to-r from-[#ee0979] to-[#ff6a00] text-white font-bold">
                <RiAccountCircleLine className="font-bold" size={25} />
              </div>
              <div className="p-2  font-bold hover:text-[#0055ff]">
                Account Details
              </div>
              <PiCaretRightThin
                size={22}
                className="text-[#596067] absolute right-0 top-3"
              />
            </div>
            <div className="h-px w-full bg-slate-300"></div>
            <div className="flex relative">
              <div className="inline-block  p-[10px] rounded-full bg-gradient-to-r from-[#05f] to-[#09f] text-white font-bold">
                <RiLockPasswordLine className="font-bold" size={25} />
              </div>
              <div className="p-2  font-bold hover:text-[#0055ff]">
                Passwords
              </div>
              <PiCaretRightThin
                size={22}
                className="text-[#596067] absolute right-0 top-3"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="text-[#ADB5BD] text-[13px] p-3 font-bold text-start ml-2">
            Others
          </div>
          <div className="ml-4 flex flex-col gap-3">
            <div className="flex relative cursor-pointer">
              <div className="inline-block p-[10px]  rounded-full bg-gradient-to-r from-[#f2994a] to-[#f2c94c] text-white font-bold">
                <FaRegBell className="font-bold" size={25} />
              </div>
              <div className="p-2  font-bold hover:text-[#0055ff]">
                Notification
              </div>
              <PiCaretRightThin
                size={22}
                className="text-[#596067] absolute right-0 top-3"
              />
            </div>
            <div className="h-px w-full bg-slate-300"></div>
            <div className="flex relative cursor-pointer">
              <div className="inline-block  p-[10px] rounded-full bg-gradient-to-r from-[#0575e6] to-[#021b79] text-white font-bold">
                <FiHelpCircle className="font-bold" size={25} />
              </div>
              <div className="p-2  font-bold hover:text-[#0055ff]">Help</div>
              <PiCaretRightThin
                size={22}
                className="text-[#596067] absolute right-0 top-3"
              />
            </div>
            <div className="h-px w-full bg-slate-300"></div>
            <div
              onClick={handleLogout}
              className="flex mb-7 relative cursor-pointer"
            >
              <div className="inline-block  p-[10px]  rounded-full bg-gradient-to-r from-[#e44d26] to-[#F16550] text-white font-bold">
                <TbLogout className="font-bold" size={25} />
              </div>
              <div className="p-2  font-bold hover:text-[#0055ff]">Logout</div>
              <PiCaretRightThin
                size={22}
                className="text-[#596067] absolute right-0 top-3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DefaultSettings;
