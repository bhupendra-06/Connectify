import React, { useState, useEffect, useRef } from "react";
import CreateStoryForm from "./CreateStoryForm";
import Cookies from "js-cookie";
import SingleStory from "./SingleStory";
import StoryShimmer from "./StoryShimmer";
import { FaArrowLeft } from "react-icons/fa";
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
  const [currentIndex, setCurrentIndex] = useState(0);

  // Tracking current image index

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

    // setTimeout to hide the story view after few seconds
    setTimeout(() => {
      setShowStory(false); // Hide the story view
      setCurrentIndex(0); // Reset the index
      if (!showStory) {
        clearTimeout();
      }
    }, 5000);
  };

  const storyBack = () => {
    setShowStory(false);
    setCurrentIndex(0);
  };

  //FOR STORY OPEN

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
  const formattedDate =
    story.stories && story.stories[currentIndex]
      ? moment(story.stories[currentIndex].createdAt).fromNow()
      : "few seconds ago";
  // const formattedDate = "few seconds ago";

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
          {/* Loader on top  */}
          <div className="absolute top-0 left-0 w-full flex z-10">
            <span className="w-full h-2 bg-red-300 z-20"></span>
            <span className="w-full h-2 bg-red-300 z-20"></span>
          </div>
          {/* USER PROFILE */}
          <div className="absolute top-0 py-2 left-0 w-full h-full  bg-gradient-to-b from-[#000000c1] from-0% to-transparent to-10%">
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
          </div>
          {/* Story Images */}
          <figure className="p-1 pt-5 mx-auto h-[calc(100vh)] w-screen flex items-start justify-center">
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
