import React, { useState } from "react";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa6";
import { FiShare2 } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import moment from "moment"; // for date formatting
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const NoUser =
  "https://i.pinimg.com/736x/16/18/20/1618201e616f4a40928c403f222d7562.jpg";

const UserPost = ({ post, onPostAdded }) => {
  
  const navigate = useNavigate();
  const formattedDate = moment(post.createdAt).fromNow();

  const [seeMore, setSeeMore] = useState(false);
  const [see, setSee] = useState("See More.");
  const [likes, setLikes] = useState(post.likes || 0);
  const [liked, setLiked] = useState(false);
  const [postImages, setPostImages] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const seeMoreFunction = () => {
    setSeeMore(!seeMore);
    setSee(see === "See More." ? "See Less." : "See More.");
  };

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

  const handleLikeClick = () => {
    if (liked) {
      setLikes((prevLikes) => prevLikes - 1);
    } else {
      setLikes((prevLikes) => prevLikes + 1);
    }
    setLiked(!liked);
  };

  const deletePost = async () => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        throw new Error("No access token found in cookies");
      }

      // console.log("post id",post._id);
      const response = await fetch(
        `https://connectify-backend-2uq0.onrender.com/api/v1/posts/delete-post/${post._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete post: " + response.statusText);
      }

      alert("Post deleted successfully!");
      onPostAdded();
      // onPostDeleted(post._id); // Trigger callback to update parent state
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete the post.");
    }
  };

  const handleUserProfile = ()=>{
    navigate(`/profile/${post.owner}`);
  }

  // console.log("post",post);

  return (
    <div>
      <div className="m-2 mt-0 p-4 rounded-lg bg-white shadow-xl shadow-gray-200 border">
        <div className="profile mb-3 flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={handleUserProfile}>
            <img
              className="w-14 h-14 object-cover rounded-full"
              src={post.avatar || NoUser}
            />
            <div className="text-start ml-3">
              <h3 className="text-xl font-bold">
                {post.username || "Anonymous"}
                <span className="text-sm text-gray-400 block">
                  {formattedDate || ""}
                </span>
              </h3>
            </div>
          </div>
          <button
            className="w-10 h-10 text-xl text-center font-bold bg-[#eee] rounded-full flex justify-center items-center"
            onClick={deletePost}
          >
            <MdDelete className="text-red-500" />
          </button>
        </div>

        {post.description && (
          <p className="mb-3 text-base text-gray-600 text-justify select-none">
            {post.description.length > 200 ? (
              <>
                {seeMore
                  ? post.description
                  : post.description.slice(0, 160) + ".."}{" "}
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

        {post.postFile && (
          <div
            className={`grid ${post.postFile.length === 1
                ? "grid-cols-1"
                : post.postFile.length === 2
                  ? "grid-cols-2"
                  : "grid-cols-3"
              } gap-2 place-items-center`}
          >
            {post.postFile.map((url, picIndex) => (
              <img
                onClick={() => displayPostImages(picIndex)}
                key={url}
                className={`${post.postFile.length == 1
                    ? "max-h-96 object-contain border"
                    : "grid-cols-3 h-full object-cover"
                  } rounded-md `}
                src={url}
                loading="lazy"
              />
            ))}
          </div>
        )}

        <div className="mt-4 mx-1 flex justify-between">
          <div className="min-w-1/2 flex gap-4 justify-between">
            <div
              className="flex items-center text-md cursor-pointer"
              onClick={handleLikeClick}
            >
              {liked ? (
                <FaThumbsUp className="p-1 mx-1 text-xl text-white bg-blue-500 rounded-full" />
              ) : (
                <FaRegThumbsUp className="p-1 mx-1 text-xl text-white bg-blue-500 rounded-full" />
              )}
              <span>{`${likes} Likes`}</span>
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
        <div className="w-screen h-screen fixed top-0 left-0 select-none z-50">
          <div className="p-2 w-full h-full bg-black flex items-center overflow-hidden">
            {post.postFile && (
              <img
                src={post.postFile[currentIndex]} // Corrected template string syntax
                className="w-[85vw] h-[90vh] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
                alt="Post"
                loading="lazy"
              />
            )}
            <RxCrossCircled
              onClick={removePostImages}
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
