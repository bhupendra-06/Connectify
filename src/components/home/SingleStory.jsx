import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { FaArrowLeft } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoSendOutline } from "react-icons/io5";
import moment from "moment"; // for date formatting
import { useNavigate } from "react-router-dom";
import NoUser from "../../assets/no-user.jpg";

const SingleStory = ({ story, index, onStoryAdded }) => {
  const [showStory, setShowStory] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();
  const storyRef = useRef();
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const [duration, setDuration] = useState(0); // Track total duration dynamically
  const [currentIndex, setCurrentIndex] = useState(0); // Tracking current image index

  const storyStyle = {
    backgroundImage: `url(${
      story.stories[story.stories.length - 1].postFile[0]
    })`,
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const biggerStory = () => {
    setShowStory(true); // Show the story view

    // Clear any existing interval and timeout before starting new ones
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);

    // Interval to update currentIndex
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex < story.stories.length - 1) {
          return prevIndex + 1; // Increment index
        } else {
          clearInterval(intervalRef.current); // Stop interval at the last story
          return prevIndex; // Keep the current index
        }
      });
      setDuration((prev) => prev + 4000);
    }, 4000); // Update every 3 seconds
  };

  const clearTimers = () => {
    clearTimeout(timeoutRef.current);
    clearInterval(intervalRef.current);
  };

  const storyBack = () => {
    clearTimers();
    setShowStory(false);
    setCurrentIndex(0);
    setDuration(0);
  };

  useEffect(() => {
    if (duration >= 4000 * story.stories.length) {
      storyBack();
    }
  }, [duration]); // Depend on `duration` updates

  // Cleanup on component unmount to avoid memory leaks
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    };
  }, []);

  //FOR STORY OPEN

  const nextImage = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, story.stories.length - 1));
    setDuration((prev) => prev + 4000);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
    setDuration((prev) => Math.max(prev - 4000, 0));
  };



  const formattedDate = moment(
    story.stories[currentIndex]?.createdAt
  ).fromNow();

  const openUserProfile = () => {
    navigate(`/profile/${story.storyOwner}`);
  };

  // CHECK OWNER ID FOR STORY
  const MyOwnerId = Cookies.get("MyOwnerId");
  // console.log("MyOwnerId:", MyOwnerId);

  if (story.storyOwner === MyOwnerId) return null;

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
                loading="lazy"
                className="rounded-full w-10 h-10 object-cover"
                src={story.avatar || NoUser}
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
          className={`w-full h-screen overflow-y-hidden bg-black absolute top-0 left-0 cursor-pointer z-50`}
        >
          {/* USER PROFILE */}
          <div className="absolute top-0 py-3 left-0 w-full h-full  bg-gradient-to-b from-[#000000c1] from-0% to-transparent to-10%">
            <div className="flex items-center justify-start">
              <span
                onClick={storyBack}
                className="mx-4 text-gray-300 text-2xl sm:text-3xl lg:text-4xl cursor-pointer z-10"
              >
                <FaArrowLeft className="drop-shadow-sm" />
              </span>
              <div
                className="flex items-center cursor-pointer"
                onClick={openUserProfile}
              >
                <img
                  className="w-12 h-12 object-cover rounded-full border-2 border-gray-400 shadow-lg"
                  src={story.avatar || NoUser}
                />
                <div className="text-start ml-2">
                  <h3 className="text-lg text-white font-bold">
                    {story.username || "Anonymous"}
                    <span className="text-xs text-gray-300/95 block">
                      {formattedDate || ""}
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          {/* Story Images */}
          <figure className="p-1 pt-16 mx-auto h-[calc(93vh)] w-screen flex items-start justify-center">
            {/* Dynamic Progress Bar on story top */}
            <div className="absolute top-0 left-0 w-full h-1.5 sm:h-1 flex z-10">
              {story.stories.map((_, idx) => (
                <div
                  key={idx}
                  className={`relative h-full rounded-xl border-x-2 border-black ${
                    idx < currentIndex ? "bg-blue-500" : "bg-gray-700"
                  }`}
                  style={{
                    width: `${100 / story.stories.length}%`, // Divide equally
                  }}
                >
                  {idx === currentIndex && (
                    <div
                      className=" rounded-xl absolute left-0 top-0 h-full bg-blue-500"
                      style={{
                        animation: `progress-animation ${4100}ms linear forwards`, // Dynamic animation
                      }}
                    ></div>
                  )}
                </div>
              ))}
            </div>

            <img
              src={story.stories[currentIndex]?.postFile[0]}
              className="h-[92%] sm:h-[98%] aspect-[6/10] max-w-screen-sm object-cover object-center mb-4"
              alt={`Story ${currentIndex + 1}`}
              loading="lazy"
            />
            {/* FOR NAVIGATING THROUGH STORIES  */}
            <div className="absolute my-28 w-full h-[calc(100vh-15rem)] flex justify-between">
              <div onClick={prevImage} className="w-1/2 h-full"></div>
              <div onClick={nextImage} className="w-1/2 h-full"></div>
            </div>
          </figure>
          <div className="m-2 p-2 px-4 w-[calc(100vw-1rem)] border border-gray-300 bg-transparent rounded-full flex items-center justify-between absolute bottom-14 sm:bottom-5">
            <p className="px-2 w-full text-gray-400 text-xl">Reply...</p>
            <IoSendOutline className="text-3xl text-gray-400 font-thin" />
          </div>
        </section>
      )}
    </>
  );
};
export default SingleStory;
