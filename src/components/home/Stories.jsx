import React, { useState, useEffect, useRef } from "react";
import CreateStoryForm from "./CreateStoryForm";
import Cookies from "js-cookie";
import SingleStory from "./SingleStory";
import StoryShimmer from "./StoryShimmer";
import { FaArrowLeft } from "react-icons/fa";

const yourStory = {
  name: "Add Story",
  profileImage:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOSyWpWSVvNFScD4JijQAi4C2zjhFnDOESQ&s",
  picture: "https://images.pexels.com/photos/753626/pexels-photo-753626.jpe",
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

  const myStoryObject = stories.find(
    (story) => story.storyOwner === MyOwnerId
  );
  // console.log(myStoryObject);

  if (error) return <div>{error}</div>;

  return (
    <div className="pl-1 pr-2 w-full lg:max-w-[] z-0">
      <div className="-mt-1 md:mt-3 lg:mt-5 h-48 w-full story-section flex items-center overflow-scroll hide-scrollbar">
        {loading ? (
          <MyStory story={yourStory} onStoryAdded={handleStoryAdded} />
        ) : (
          <MyStory story={myStoryObject} onStoryAdded={handleStoryAdded} />
        )}
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

  useEffect(() => {
    if (story?.stories?.length > 0) {
      // console.log(story.stories[story.stories.length - 1]);
      setMyStoryBg(story.stories[story.stories.length - 1].postFile[0]);
      // console.log("My story", myStoryBg);
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

    // setTimeout to hide the story view after 6 seconds
    setTimeout(() => {
      setShowStory(false); // Hide the story view
      setCurrentIndex(0); // Reset the index
      if (!showStory) {
        clearTimeout();
      }
    }, 9000);
  };

  const storyBack = () => {
    setShowStory(false);
    setCurrentIndex(0);
  };

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
      {(showStory && story) && (
        <section
          id="story-image"
          ref={storyRef}
          className="w-full h-screen overflow-hidden bg-black absolute top-0 left-0 cursor-pointer z-50"
        >
          <span
            onClick={storyBack}
            className="absolute top-0 left-0 text-gray-400 text-2xl sm:text-3xl lg:text-4xl cursor-pointer z-10"
          >
            <FaArrowLeft className="m-4 drop-shadow-sm" />
          </span>
          <figure className="p-1 mx-auto h-full w-screen flex items-start justify-center">
            <img
              src={story?.stories[currentIndex].postFile[0]}
              className="h-[98%] aspect-[6/10] object-cover object-center mb-4"
              alt={`Story ${currentIndex + 1}`}
            />
            {/* FOR NAVIGATING THROUGH STORIES  */}
            <div className="absolute w-full h-full flex bg-transparent">
              <div onClick={prevImage} className="w-full h-full"></div>
              <div onClick={nextImage} className="w-full h-full"></div>
            </div>
          </figure>
        </section>
      )}
    </>
  );
};
