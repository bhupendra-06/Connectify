import React from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { LuVideo } from "react-icons/lu";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import { HiOutlinePencilAlt } from "react-icons/hi";

const CreatPost = () => {
  return (
    <div className="mx-2 my-5 p-5 border shadow-lg shadow-gray-200 rounded-lg">
      <div className="flex items-center">
        <div className="w-10 h-10 text-xl font-bold bg-[#eee] grid place-items-center rounded-full">
          <HiOutlinePencilAlt className="text-2xl text-blue-600" />
        </div>
        <h4 className="mx-2 text-sm text-gray-400 font-bold">Creat Post</h4>
      </div>
      <div className="relative my-5 h-24 rounded-lg border-2 border-gray-300 overflow-hidden">
        <figure className="absolute top-0 left-0">
          <FaCircleUser className="icon text-yellow-500" />
        </figure>
        <textarea className="pl-12 w-full h-full rounded-lg p-2 outline-none"></textarea>
      </div>
      <div className="mx-auto flex justify-between">
        <div className="flex gap-2 text-sm">
          <div className="flex items-center">
            <LuVideo className="mx-1 text-xl text-red-500" />
            <span className="hidden sm:inline-block">Live</span>
          </div>
          <div className="flex items-center">
            <MdOutlineAddPhotoAlternate className="mx-1 text-xl text-green-500" />
            <span className="hidden sm:inline-block">Photo/Video</span>
          </div>
          <div className="flex items-center">
            <MdOutlinePhotoCamera className="mx-1 text-xl text-orange-500" />
            <span className=" hidden sm:inline-block">Activity</span>
          </div>
        </div>
        <div className="w-10 h-10 text-xl font-bold bg-[#eee] rounded-full">
          ...
        </div>
      </div>
    </div>
  );
};

export default CreatPost;
