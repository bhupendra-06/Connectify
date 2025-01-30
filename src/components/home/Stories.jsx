import React, { useState, useEffect, useRef } from "react";
import CreateStoryForm from "./CreateStoryForm";
import Cookies from "js-cookie";
import SingleStory from "./SingleStory";
import StoryShimmer from "./StoryShimmer";
import { FaArrowLeft } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoSendOutline } from "react-icons/io5";
import moment from "moment"; // for date formatting
import NoUser from "../../assets/no-user.jpg";

const yourStory = {
  name: "Add Story",
};

// STORIES COMPONENT STARTS HERE
const Stories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStories = async () => {
    try {
      const token = Cookies.get("accessToken");

      if (!token) {
        throw new Error("No access token found in cookies");
      }

      const response = await fetch(
        "https://connectify-backend-2uq0.onrender.com/api/v1/story/get-story",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch stories: " + response.statusText);
      }

      const res = await response.json();
      const data = res.data;

      setStories(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching stories:", err);
      setError("Failed to load stories.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handleStoryAdded = () => {
    fetchStories();
  };
  // CHECK OWNER ID FOR STORY
  const MyOwnerId = Cookies.get("MyOwnerId");
  // console.log("MyOwnerId:", MyOwnerId);

  const myStoryObject = stories.find((story) => story.storyOwner === MyOwnerId);
  // console.log(myStoryObject);

  if (error) return <div>{error}</div>;

  return (
    <div className="pl-1 pr-2 w-full lg:max-w-[] z-0">
      <div className="-mt-1 md:mt-3 lg:mt-5 h-48 w-full story-section flex items-center overflow-scroll hide-scrollbar">
        <MyStory
          story={loading ? yourStory : myStoryObject || yourStory}
          onStoryAdded={handleStoryAdded}
        />

        {loading ? (
          <StoryShimmer />
        ) : (
          stories.map((story, index) => (
            <SingleStory
              story={story}
              index={index}
              key={index}
              onStoryAdded={handleStoryAdded}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Stories;

const MyStory = ({ story, onStoryAdded }) => {
  const [showStory, setShowStory] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [myStoryBg, setMyStoryBg] = useState("");
  const storyRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0); // Tracking current image index
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const [duration, setDuration] = useState(0); // Track total duration dynamically

  useEffect(() => {
    if (story?.stories?.length > 0) {
      // console.log(story.stories[story.stories.length - 1]);
      setMyStoryBg(story.stories[story.stories.length - 1].postFile[0]);
    }
  }, [story]);

  const storyStyle = {
    backgroundImage: `url(${myStoryBg || ""})`,
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
        `https://connectify-backend-2uq0.onrender.com/api/v1/story/delete-story/${story.stories[currentIndex]._id}`,
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
      storyBack();
      onStoryAdded();
    } catch (err) {
      console.error("Error deleting story:", err);
      alert("Failed to delete the story.");
    }
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
      console.log(story.stories[currentIndex]._id);
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
    setShowOptions(false);
  };

  useEffect(() => {
    if (story?.stories && duration >= 4000 * story.stories.length) {
      storyBack();
    }
  }, [duration, story]);

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

  const formattedDate =
    story.stories && story.stories[currentIndex]
      ? moment(story.stories[currentIndex].createdAt).fromNow()
      : "few seconds ago";

  return (
    <>
      {
        <div
          id="story"
          onClick={biggerStory}
          className={`story overflow-hidden bg-cover bg-center bg-gray-50 border ml-2 min-w-28 h-44 rounded-lg shadow-lg`}
          style={storyStyle}
        >
          <div className="p-2 bg-gradient-to-b from-transparent from-0%  to-[#000000ac] to-100% w-full h-full flex flex-col items-center justify-end gap-1">
            <CreateStoryForm onStoryAdded={onStoryAdded} />
            <h4 className="text-xs font-bold text-white text-center">
              My Story
            </h4>
          </div>
        </div>
      }
      {/* Full Screen Preview of Story */}
      {showStory && story.stories && (
        <section
          id="story-image"
          ref={storyRef}
          className={`w-full h-screen overflow-y-hidden bg-black absolute top-0 left-0 cursor-pointer z-50`}
        >
          {/* USER PROFILE */}
          <div className="absolute top-0 py-3 left-0 w-full h-full flex items-start justify-between bg-gradient-to-b from-[#000000c1] from-0% to-transparent to-10%">
            <div className="flex items-center justify-start">
              <span
                onClick={storyBack}
                className="mx-4 text-gray-300 text-2xl sm:text-3xl lg:text-4xl cursor-pointer z-10"
              >
                <FaArrowLeft className="drop-shadow-sm" />
              </span>
              <div
                className="flex items-center cursor-pointer"
                // onClick={openUserProfile}
              >
                <img
                  className="w-12 h-12 object-cover rounded-full border border-gray-400 shadow-lg"
                  src={story.avatar || NoUser}
                />
                <div className="text-start ml-2">
                  <h3 className="text-lg text-white font-bold">
                    {story.username || "Anonymous"}
                    <span className="text-xs text-gray-300/95 block">
                      {formattedDate || "few seconds ago"}
                    </span>
                  </h3>
                </div>
              </div>
            </div>
            <div className="mx-2 menu flex flex-col items-end">
              <div
                className="menu-icon"
                onClick={() => setShowOptions(!showOptions)}
              >
                {/* Three vertical dots icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-dots-vertical"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="19" r="1" />
                  <circle cx="12" cy="5" r="1" />
                </svg>
              </div>
              {showOptions && (
                <div className="dropdown-menu m-4 bg-red-500 py-1 px-2 rounded-md text-white text-sm">
                  <ul>
                    <li onClick={deleteStory} className="hidden sm:inline-block">Delete Story</li>
                    <li onClick={deleteStory} className="sm:hidden">
                      <MdDelete/>
                    </li>
                    {/* Other options can be added here */}
                  </ul>
                </div>
              )}
            </div>
          </div>
          {/* Story Images */}
          <figure className="p-1 pt-5 mx-auto h-[calc(100vh)] w-screen flex items-start justify-center">
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
              src={story.stories[currentIndex].postFile[0]}
              className="h-[92%] sm:h-[98%] aspect-[6/10] max-w-screen-sm object-cover object-center mb-4"
              alt={`Story ${currentIndex + 1}`}
              loading="lazy"
            />
            {/* FOR NAVIGATING THROUGH STORIES  */}
            <div className="absolute my-28 w-full h-[calc(100vh-15rem)] flex bg-">
              <div onClick={prevImage} className="w-full h-full"></div>
              <div onClick={nextImage} className="w-full h-full"></div>
            </div>
          </figure>
        </section>
      )}
    </>
  );
};
