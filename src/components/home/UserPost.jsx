import React, {useEffect, useState } from "react";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa6";
import { FiShare2 } from "react-icons/fi";

const NoUser =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA3W3oppN7sdVCsUWwwnPIn9pX6E6G2UW70w&s";

const UserPost = ({ post, index }) => {
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   // Fetch posts data from the JSON file
  //   setPosts(postsData);
  // }, []);

  const [seeMore, setSeeMore] = useState(false);
  const sm = document.getElementById("see-more");
  const seeMoreFunction = () => {
    setSeeMore(!seeMore);
  };

  return (
    <div key={index}>
      <div className="my-2 p-5 rounded-xl bg-yellow-50 border">
        <div className="profile mb-5 flex items-center justify-between">
          <div>
            <div className="flex items-center justify-center">
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
          </div>
          <div className="w-10 h-10 text-xl font-bold bg-[#eee] rounded-full">
            ...
          </div>
        </div>
        {post.caption &&
          (post.caption.length > 150 ? (
            <p className="mb-5 text-lg text-gray-400 text-justify">
              {seeMore ? post.caption : post.caption.slice(0, 100) + ".."}{" "}
              <span
                onClick={seeMoreFunction}
                id="see-more"
                className="text-blue-600 font-semibold cursor-pointer"
              >
                See more.
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
                  key={picIndex}
                  className="h-full object-cover rounded-lg"
                  src={url || "https://uitheme.net/sociala/images/t-10.jpg"}
                />
              );
            })}
          </div>
        )}

        <div className="my-6 mx-1 flex justify-between">
          <div className="flex items-center text-md">
            <FaRegThumbsUp className="p-1 mx-1 text-xl text-white bg-blue-500 rounded-full" />
            <FaRegHeart className="p-1 mx-1 text-xl text-white bg-red-500 rounded-full" />
            <span>{`${post.likes || ""} Likes`}</span>
          </div>
          <div className="flex items-center text-md">
            <FaRegComment className="mx-1" />
            <span>{`${post.comments || ""} Comments`}</span>
          </div>
          <div className="flex items-center text-md">
            <FiShare2 className="mx-1" />
            <span className=" hidden sm:block">Share</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPost;

// POST COMPONENT

// const PostComponent = ({ post }) => {
//   return (

//   );
// };
