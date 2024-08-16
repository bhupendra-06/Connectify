import React, { useState } from "react";
import { PiGlobeSimpleBold } from "react-icons/pi";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { LuAward, LuHome } from "react-icons/lu";
import { GiElectric } from "react-icons/gi";
import { GoPerson } from "react-icons/go";
import { GrLocation } from "react-icons/gr";
import { FiYoutube } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineWatchLater } from "react-icons/md";
import { MdOutlineChatBubbleOutline } from "react-icons/md";

function Sidebar() {
  const [position, setposition] = useState(0);

  const slider = () => setposition(position === 0 ? -280 : 0);

  console.log(position);

  return (
    <div className="hidden lg:block my-[72px] lg:my-[85px] fixed top-0 h-screen w-screen lg:w-fit bg-[#00000038] overflow-hidden hide-scrollbar z-10">
    {/* TOGGE BUTTON */}
      <div className="w-40 hidden">
        <button className="bg-red-400 p-4" onClick={slider}>
          X
        </button>
      </div>
      <div className="w-fit bg-white ">
        <div
          className={`pt-4 h-[calc(100vh-73px)] min-w-[280px] w-[280px] transition-all overflow-scroll hide-scrollbar duration-500`}
          style={{ left: `${position}px` }}
        >
          <div className="mb-3 w-[250px] bg-white shadow-lg m-auto rounded-xl border-2 border-gray-100">
            <div className="text-[#ADB5BD] w-28 text-[13px] p-3 font-bold ">
              New Feeds
            </div>
            <div className="ml-4 flex flex-col gap-3">
              <div className="flex ">
                <div className="inline-block p-[10px]  rounded-full bg-gradient-to-r from-[#0575e6] to-[#021b79] text-white font-bold">
                  <PiTelevisionSimpleBold className="font-bold" size={25} />
                </div>
                <div className="p-2 text-[#888] font-bold hover:text-[#0055ff]">
                  Newsfeed
                </div>
              </div>
              <div className="flex ">
                <div className="inline-block  p-[10px] rounded-full bg-gradient-to-r from-[#e44d26] to-[#F16550] text-white font-bold">
                  <LuAward className="font-bold" size={25} />
                </div>
                <div className="p-2 text-[#888] font-bold hover:text-[#0055ff]">
                  Badges
                </div>
              </div>
              <div className="flex ">
                <div className="inline-block  p-[10px]  rounded-full bg-gradient-to-r from-[#f2994a] to-[#f2c94c] text-white font-bold">
                  <PiGlobeSimpleBold className="font-bold" size={25} />
                </div>
                <div className="p-2 text-[#888] font-bold hover:text-[#0055ff]">
                  Explore Stories
                </div>
              </div>
              <div className="flex ">
                <div className="inline-block  p-[10px]  rounded-full bg-gradient-to-r from-[#ee0979] to-[#ff6a00] text-white font-bold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e8eaed"
                  >
                    <path d="m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z" />
                  </svg>
                </div>
                <div className="p-2 text-[#888] font-bold hover:text-[#0055ff]">
                  Popular Groups
                </div>
              </div>
              <div className="flex mb-3">
                <div className="inline-block  p-[10px]  rounded-full bg-gradient-to-r from-[#05f] to-[#09f] text-white font-bold">
                  <GoPerson className="font-bold" size={25} />
                </div>
                <div className="p-2 text-[#888] font-bold hover:text-[#0055ff]">
                  Author Profile
                </div>
              </div>
            </div>
          </div>

          <div className="mb-3 w-[250px] bg-white shadow-lg m-auto rounded-xl border-2 border-gray-100">
            <div className="text-[#ADB5BD] w-28 text-[13px] p-3 font-bold ">
              More Pages
            </div>
            <div className="ml-4 flex flex-col gap-3">
              <div className="flex ">
                <div className="inline-block p-[10px]  rounded-full  text-[#0055ff] font-bold">
                  <MdOutlineMailOutline className="font-bold" size={30} />
                </div>
                <div className="p-3 text-[#888] font-bold hover:text-[#0055ff]">
                  Email Box
                </div>
              </div>
              <div className="flex ">
                <div className="inline-block p-[10px]  rounded-full  text-[#0055ff] font-bold">
                  <LuHome className="font-bold" size={30} />
                </div>
                <div className="p-3 text-[#888] font-bold hover:text-[#0055ff]">
                  Near Hotel
                </div>
              </div>
              <div className="flex ">
                <div className="inline-block p-[10px]  rounded-full  text-[#0055ff] font-bold">
                  <GrLocation className="font-bold" size={33} />
                </div>
                <div className="p-3 text-[#888] font-bold hover:text-[#0055ff]">
                  Latest Event
                </div>
              </div>
              <div className="flex mb-3">
                <div className="inline-block p-[10px]  rounded-full  text-[#0055ff] font-bold">
                  <FiYoutube className="font-bold" size={30} />
                </div>
                <div className="p-3 text-[#888] font-bold hover:text-[#0055ff]">
                  Live Stream
                </div>
              </div>
            </div>
          </div>

          <div className="mb-3 w-[250px] bg-white shadow-lg m-auto rounded-xl border-2 border-gray-100">
            <div className="text-[#ADB5BD] w-28 text-[13px] p-3 font-bold ">
              Accounts
            </div>
            <div className="ml-4 flex flex-col gap-3">
              <div className="flex ">
                <div className="inline-block p-[10px]  rounded-full  text-[#888] font-bold">
                  <IoSettingsOutline className="font-bold" size={25} />
                </div>
                <div className="p-3 text-[#888] font-bold hover:text-[#0055ff]">
                  Setting
                </div>
              </div>
              <div className="flex ">
                <div className="inline-block p-[10px]  rounded-full  text-[#888] font-bold">
                  <MdOutlineWatchLater className="font-bold" size={25} />
                </div>
                <div className="p-3 text-[#888] font-bold hover:text-[#0055ff]">
                  Analysis
                </div>
              </div>
              <div className="flex mb-3">
                <div className="inline-block p-[10px]  rounded-full  text-[#888] font-bold">
                  <MdOutlineChatBubbleOutline className="font-bold" size={25} />
                </div>
                <div className="p-3 text-[#888] font-bold hover:text-[#0055ff]">
                  Chat
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
