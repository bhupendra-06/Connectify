import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie"
import { FaArrowLeft } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const SingleStory = ({ story, index, onStoryAdded }) => {
  const [showStory, setShowStory] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const storyRef = useRef();

  const storyStyle = {
    backgroundImage: `url(${story.stories[story.stories.length-1].postFile[0]})`,
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const deleteStory = async () => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        throw new Error("No access token found in cookies");
      }

      const response = await fetch(
        `https://connectify-backend-2uq0.onrender.com/api/v1/story/delete-story/${story.storyId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete story: " + response.statusText);
      }

      alert("Story deleted successfully!");
      onStoryAdded();
    } catch (err) {
      console.error("Error deleting story:", err);
      alert("Failed to delete the story.");
    }
  };

  const biggerStory = () => {
    setShowStory(true); // Show the story view
    
    // setTimeout to hide the story view after 6 seconds
    setTimeout(() => {
      setShowStory(false); // Hide the story view
      setCurrentIndex(0); // Reset the index
    }, 6000);
  };
  
  const storyBack = () => {
    // if (document.exitFullscreen) {
    //   document.exitFullscreen();
    // } else if (document.webkitExitFullscreen) {
    //   document.webkitExitFullscreen();
    // } else if (document.msExitFullscreen) {
    //   document.msExitFullscreen();
    // }
    setShowStory(false);
    setCurrentIndex(0);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".options-menu") &&
        !event.target.closest(".options-button")
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //FOR STORY OPEN
  const [currentIndex, setCurrentIndex] = useState(0); // Tracking current image index

  const nextImage = () => {
    if (currentIndex < story.stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  
  // CHECK OWNER ID FOR STORY
  const MyOwnerId = Cookies.get("MyOwnerId");
  // console.log("MyOwnerId:", MyOwnerId);
  
  if(story.storyOwner === MyOwnerId) return "";

  return (
    <>
      {story.stories && (
        <div
          key={index}
          id="story"
          className={`story overflow-hidden bg-cover bg-center ml-2 min-w-28 h-44 rounded-lg shadow-lg`}
          style={storyStyle} // For background image
          onClick={biggerStory}
        >
          <div className="p-2 bg-gradient-to-b from-transparent from-0% via-gray-900/10 via-50% to-[#000000ee] to-100% w-full max-w-28 overflow-hidden h-full flex flex-col items-center justify-end gap-1 shadow-sm border border-gray-200">
            <figure className="mx-auto w-10 h-10 object-cover border border-[#959595] rounded-full overflow-hidden">
              <img
                className="rounded-full w-10 h-10 object-cover"
                src={
                  story.avatar ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA3W3oppN7sdVCsUWwwnPIn9pX6E6G2UW70w&s"
                }
              />
            </figure>
            <h4 className="max-w-20 overflow-hidden text-xs font-bold text-white text-center">
              {story.username || "Person"}
            </h4>
          </div>
        </div>
      )}
      {/* Full Screen Preview of Story */}
      {showStory && (
        <section
          id="story-image"
          ref={storyRef}
          className={`${""} w-full h-screen overflow-hidden bg-black absolute top-0 left-0 cursor-pointer z-50`}
        >
          <span
            onClick={storyBack}
            className="absolute top-0 left-0 text-gray-400 text-2xl sm:text-3xl lg:text-4xl cursor-pointer z-10"
          >
            <FaArrowLeft className="m-4 drop-shadow-sm" />
          </span>
          <figure className="p-1 mx-auto h-full w-screen flex items-start justify-center">
            <img
              src={story.stories[currentIndex].postFile[0]}
              className="h-[98%] aspect-[6/10] object-cover object-center mb-4"
              alt={`Story ${index + 1}`}
            />
            {/* FOR NAVIGATING THROUGH STORIES  */}
            <div className="absolute w-full h-full flex bg-transparent">
              <div
                onClick={prevImage}
                className="w-full h-full"
              ></div>
              <div
                onClick={nextImage}
                className="w-full h-full"
              ></div>
            </div>
          </figure>
        </section>
      )}
    </>
  );
};
export default SingleStory;
