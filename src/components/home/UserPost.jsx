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

const UserPost = ({ post, index }) => {
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   // Fetch posts data from the JSON file
  //   setPosts(postsData);
  // }, []);

  const [seeMore, setSeeMore] = useState(false);
  const [see, setSee] = useState("See More.");

  const seeMoreFunction = () => {
    setSeeMore(!seeMore);
    see == "See More." ? setSee("See Less.") : setSee("See More.");
  };

  // FOR FULL SCREEN POST IMAGES

  const [currentIndex, setCurrentIndex] = useState(0);
  const [postImages, setPostImages] = useState(null);

  const displayPostImages = (picIndex) => {
    setPostImages(true);
    setCurrentIndex(picIndex);
    console.log(picIndex);
  };
  const removePostImages = () => {
    setPostImages(null);
  };
  const goBack = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? post.pictures.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goForward = () => {
    const isLastImage = currentIndex === post.pictures.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // RETURN FUNCTION FOR USER POST COMPONENT IS HERE
  return (
    <div key={index}>
      <div className="m-2 mt-0 p-5 rounded-lg bg-white shadow-xl shadow-gray-200 border">
        <div className="profile mb-5 flex items-center justify-between">
          <div>
            <div className="flex items-center justify-center">
              <img
                className="w-14 h-14 object-cover rounded-full"
                src={post.profileImage || NoUser}
              />
              <div className="text-start ml-3">
                <h3 className="text-lg font-bold">
                  {post.name || "Anonymous"}
                  <span className="text-sm text-gray-400 block">
                    {post.lastSeen || "Last seen.."}
                  </span>
                </h3>
              </div>
            </div>
          </div>
          <div className="w-10 h-10 text-xl font-bold bg-[#eee] rounded-full">
            ...
          </div>
        </div>
        {post.caption &&
          (post.caption.length > 150 ? (
            <p className="mb-5 text-base text-gray-400 text-justify select-none">
              {seeMore ? post.caption : post.caption.slice(0, 150) + ".."}{" "}
              <span
                onClick={seeMoreFunction}
                className="text-blue-600 font-semibold cursor-pointer"
              >
                {see}
              </span>
            </p>
          ) : (
            <p className="mb-5 text-lg text-gray-400 text-justify">
              {post.caption}
            </p>
          ))}
        {/* MAPPING THE POST PICTURES HERE */}
        {post.pictures && (
          <div className="grid grid-cols-3 gap-2">
            {post.pictures.map((url, picIndex) => {
              return (
                <img
                  onClick={() => displayPostImages(picIndex)}
                  key={picIndex}
                  className="h-full object-cover rounded-lg"
                  src={url}
                />
              );
            })}
          </div>
        )}

        <div className="my-6 mx-1 flex justify-between">
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
            <span className=" hidden sm:block">Share</span>
          </div>
        </div>
      </div>
      {/* WHEN POST HAS MULTIPLE IMAGES */}
      {postImages && (
        <div className="w-screen h-screen absolute top-0 left-0 select-none z-50">
          <div className="p-2 w-full h-full bg-[#000] flex items-center overflow-hidden">
            {post.pictures && (
              <img
                src={`${post.pictures[currentIndex]}`}
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
              className="text-3xl md:text-5xl text-gray-300 border border-gray-500 absolute right-2  lg:right-10 top-1/2 -translate-y-1/2 select-none cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPost;
