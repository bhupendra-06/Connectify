import React, { useEffect, useState } from "react";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa6";
import { FiShare2 } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";

const NoUser =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA3W3oppN7sdVCsUWwwnPIn9pX6E6G2UW70w&s";

const UserPost = ({ post }) => {
  const [seeMore, setSeeMore] = useState(false);
  const [see, setSee] = useState("See More.");

  const seeMoreFunction = () => {
    setSeeMore(!seeMore);
    see === "See More." ? setSee("See Less.") : setSee("See More.");
  };

  // FOR FULL SCREEN POST IMAGES
  const [currentIndex, setCurrentIndex] = useState(0);
  const [postImages, setPostImages] = useState(null);

  const displayPostImages = (picIndex) => {
    setPostImages(true);
    setCurrentIndex(picIndex);
  };

  const removePostImages = () => {
    setPostImages(null);
  };

  const goBack = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? post.postFile.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goForward = () => {
    const isLastImage = currentIndex === post.postFile.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div>
      <div className="m-2 mt-0 p-4 rounded-lg bg-white shadow-xl shadow-gray-200 border">
        <div className="profile mb-3 flex items-center justify-between">
          <div className="flex items-center">
            <img
              className="w-14 h-14 object-cover rounded-full"
              src={post.profileImage || NoUser}
            />
            <div className="text-start ml-3">
              <h3 className="text-xl font-bold">
                {post.name || "Anonymous"}
                <span className="text-base text-gray-400 block">
                  {post.lastSeen || "Last seen.."}
                </span>
              </h3>
            </div>
          </div>
          <div className="w-10 h-10 text-xl text-center font-bold bg-[#eee] rounded-full">
            ...
          </div>
        </div>

        {post.description && (
          <p className="mb-3 text-lg text-gray-600 text-justify select-none">
            {post.description.length > 200 ? (
              <>
                {seeMore ? post.description : post.description.slice(0, 160) + ".."}{" "}
                <span
                  onClick={seeMoreFunction}
                  className="text-blue-600 font-semibold cursor-pointer"
                >
                  {see}
                </span>
              </>
            ) : (
              post.description
            )}
          </p>
        )}

        {/* MAPPING THE POST postFile HERE */}
        {post.postFile && (
          <div className={`grid ${"grid-cols-"+ post.postFile.length} gap-2 place-items-center`}>
            {post.postFile.map((url, picIndex) => (
              <img
                onClick={() => displayPostImages(picIndex)}
                key={url} // Using URL as the key
                className={`${post.postFile.length==1?"max-h-96 h-72 max-w-96 w-full sm:h-96 border":"grid-cols-3 h-full"} object-cover rounded-md `}
                src={url}
              />
            ))}
          </div>
        )}

        <div className="mt-4 mx-1 flex justify-between">
          <div className="min-w-1/2 flex gap-4 justify-between">
            <div className="flex items-center text-md">
              <FaRegThumbsUp className="p-1 mx-1 text-xl text-white bg-blue-500 rounded-full" />
              {/* <FaRegHeart className="p-1 mx-1 text-xl text-white bg-red-500 rounded-full" /> */}
              <span>{`${post.likes || ""} Likes`}</span>
            </div>
            <div className="flex items-center text-md">
              <FaRegComment className="mx-1" />
              <span>{`${post.comments || ""} Comments`}</span>
            </div>
          </div>
          <div className="flex items-center text-md">
            <FiShare2 className="mx-1" />
            <span className="hidden sm:block">Share</span>
          </div>
        </div>
      </div>

      {/* FULL SCREEN VIEW OF IMAGES */}
      {postImages && (
        <div className="w-screen h-screen absolute top-0 left-0 select-none z-50">
          <div className="p-2 w-full h-full bg-[#000] flex items-center overflow-hidden">
            {post.postFile && (
              <img
                src={`${post.postFile[currentIndex]}`}
                className="w-[85vw] h-[90vh] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
              />
            )}
            <RxCrossCircled
              onClick={() => removePostImages()}
              className="text-5xl md:text-5xl text-gray-600 absolute left-2 lg:left-10 top-2 lg:top-5 select-none cursor-pointer"
            />

            <IoIosArrowBack
              onClick={goBack}
              className="text-3xl md:text-5xl text-gray-300 border border-gray-500 absolute left-2 lg:left-10 top-1/2 -translate-y-1/2 select-none cursor-pointer"
            />
            <IoIosArrowForward
              onClick={goForward}
              className="text-3xl md:text-5xl text-gray-300 border border-gray-500 absolute right-2 lg:right-10 top-1/2 -translate-y-1/2 select-none cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPost;
