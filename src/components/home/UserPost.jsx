import React, { useEffect, useState } from "react";
import { FaRegComment } from "react-icons/fa6";
import { FiShare2 } from "react-icons/fi";
import moment from "moment"; // for date formatting
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NoUser from "../../assets/no-user.jpg";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import ImageCarousel from "./ImageCarousel";
import PostShimmer from "./PostShimmer";

const UserPost = ({ post, onPostAdded }) => {
  const navigate = useNavigate();
  const formattedDate = moment(post.createdAt).fromNow();

  const [seeMore, setSeeMore] = useState(false);
  const [see, setSee] = useState("See More.");
  const [likes, setLikes] = useState(post.likes?.length || 0);
  const [liked, setLiked] = useState(post.isLiked);
  const [postImages, setPostImages] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const token = Cookies.get("accessToken");

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

  const handleLikeClick = async () => {
    if (!token) {
      alert("Please log in to like posts!");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.put(
        `https://connectify-backend-2uq0.onrender.com/api/v1/posts/like-post/${post._id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setLikes(response.data.data.likes.length);
        setLiked(!liked);
      } else {
        console.error("Failed to update like status:", response.data);
        alert("Failed to update like status. Please try again.");
      }
    } catch (error) {
      console.error(
        "Error updating like status:",
        error.response?.data || error.message
      );
      alert("Failed to update like status. Please try again.");
    }
  };

  const deletePost = async () => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        throw new Error("No access token found in cookies");
      }

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
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete the post.");
    }
  };

  const handleUserProfile = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        navigate(`/profile/${post.owner}`);
      });
    } else {
      navigate(`/profile/${post.owner}`);
    }
  };

  return (
    <div>
      {post ? (
        <div className="m-2 mt-0 p-4 rounded-2xl bg-white shadow-md hover:shadow-xl transition border border-gray-100">
          {/* User Profile */}
          <div className="mb-3 flex items-center justify-between select-none">
            <div
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition"
              onClick={handleUserProfile}
            >
              <img
                className="w-12 h-12 object-cover rounded-full ring-2 ring-primaryColor/40"
                src={post.avatar || NoUser}
                alt="user avatar"
              />
              <div className="text-start">
                <h3 className="text-lg font-semibold">
                  {post.username || "Anonymous"}
                </h3>
                <span className="text-sm text-gray-400">{formattedDate || ""}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          {post.description && (
            <p className="mb-3 text-gray-700 text-justify leading-relaxed">
              {post.description.length > 200 ? (
                <>
                  {seeMore
                    ? post.description
                    : post.description.slice(0, 160) + ".."}{" "}
                  <span
                    onClick={seeMoreFunction}
                    className="text-blue-600 font-medium cursor-pointer hover:underline"
                  >
                    {see}
                  </span>
                </>
              ) : (
                post.description
              )}
            </p>
          )}

          {/* Images Grid */}
          {post.postFile && (
            <div
              className={`grid gap-2 ${
                post.postFile.length === 1
                  ? "grid-cols-1"
                  : post.postFile.length === 2
                  ? "grid-cols-2"
                  : "grid-cols-3"
              }`}
            >
              {post.postFile.slice(0, 5).map((url, picIndex) => (
                <div
                  key={picIndex}
                  className="relative rounded-xl overflow-hidden cursor-pointer group"
                >
                  <img
                    onClick={() => displayPostImages(picIndex)}
                    src={url}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    alt={`Post image ${picIndex + 1}`}
                  />
                  {picIndex === 4 && post.postFile.length > 5 && (
                    <div
                      className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-2xl font-bold"
                      onClick={() => displayPostImages(picIndex)}
                    >
                      +{post.postFile.length - 5}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Likes / Comments / Share */}
          <div className="mt-3 border-t pt-2 flex justify-around text-gray-600">
            <div
              className="flex items-center gap-2 cursor-pointer hover:text-red-500 transition"
              onClick={handleLikeClick}
            >
              {liked ? (
                <BsHeartFill className="text-2xl text-red-600 animate-pulse" />
              ) : (
                <BsHeart className="text-2xl" />
              )}
              <span className={liked ? "text-red-600 font-semibold" : ""}>
                {likes} Likes
              </span>
            </div>

            <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500">
              <FaRegComment className="text-xl" />
              <span>{post.comments || 0} Comments</span>
            </div>

            <div className="flex items-center gap-2 cursor-pointer hover:text-green-500">
              <FiShare2 className="text-xl" />
              <span className="hidden sm:block">Share</span>
            </div>
          </div>
        </div>
      ) : (
        <PostShimmer />
      )}

      {/* FULL SCREEN VIEW */}
      {postImages && (
        <ImageCarousel
          post={post}
          currentIndex={currentIndex}
          removePostImages={removePostImages}
        />
      )}
    </div>
  );
};

export default UserPost;
