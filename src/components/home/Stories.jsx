import React, { useState, useEffect } from "react";
import CreateStoryForm from "./CreateStoryForm";
import { FaArrowLeft } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

  import Cookies from "js-cookie"; 

const yourStory = {
  name: "Add Story",
  profileImage:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOSyWpWSVvNFScD4JijQAi4C2zjhFnDOESQ&s",
  picture: "https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg",
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

      const data = await response.json();
      const fetchedStories = data.data.map((story) => ({
        name: story.fullName || story.username,
        storyId : story._id,
        profileImage: story.avatar,
        picture: story.postFile[0],
        description: story.description,
        createdAt: story.createdAt,
      }));

      setStories(fetchedStories);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching stories:", err);
      setError("Failed to load stories.");
      setLoading(false);
    }
  };

  const handleStoryAdded = () => {
    fetchStories();
  };

  useEffect(() => {
    fetchStories();
  }, []);

  if (loading) return <div>Loading stories...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="pl-1 pr-2 w-full lg:max-w-[] z-0">
      <div className="-mt-1 md:mt-3 lg:mt-5 h-48 w-full story-section flex items-center overflow-scroll hide-scrollbar">
        <MyStory story={yourStory} index={"yourStory"} onStoryAdded={handleStoryAdded} />
        {stories.map((story, index) => (
          <SingleStory story={story} index={index} key={index} onStoryAdded={handleStoryAdded}/>
        ))}
      </div>
    </div>
  );
};



export default Stories;

const SingleStory = ({ story, index ,onStoryAdded}) => {
  const storyStyle = {
    backgroundImage: `url(${story.picture})`,
  };

  const [showStory, setShowStory] = useState("hidden");
  const [showOptions, setShowOptions] = useState(false);

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
    setShowStory("");
    setTimeout(() => {
      setShowStory("hidden");
    }, 1800);
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

  return (
    <>
      {story.picture && (
        <div
          key={index}
          id="story"
          className={`story overflow-hidden bg-cover ml-2 min-w-28 h-44 rounded-lg shadow-lg`}
          style={storyStyle}
          onClick={biggerStory}
        >
          {/* Three Dot Menu */}
          <div className="relative">
            <button
              className="options-button absolute top-2 right-2 text-white text-xl focus:outline-none"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the biggerStory handler
                toggleOptions();
              }}
            >
              ⋮
            </button>
            {showOptions && (
              <div
                className="options-menu absolute top-8 right-2 bg-white text-black shadow-lg rounded-md z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="block w-full text-left"
                  onClick={deleteStory}
                >
                  <MdDelete size={30} />
                </button>
              </div>
            )}
          </div>

          <div className="p-2 bg-gradient-to-b from-transparent from-50% via- to-[#000000ee] to-100% w-full h-full flex flex-col items-center justify-end gap-1">
            <figure className="mx-auto w-10 h-10 object-cover border border-[#959595] rounded-full overflow-hidden">
              <img
                className="rounded-full w-10 h-10 object-cover"
                src={
                  story.profileImage ||
                  "https://media.istockphoto.com/id/1311084168/photo/overjoyed-pretty-asian-woman-look-at-camera-with-sincere-laughter.webp?b=1&s=170667a&w=0&k=20&c=XPuGhP9YyCWquTGT-tUFk6TwI-HZfOr1jNkehKQ17g0="
                }
              />
            </figure>
            <h4 className="text-xs font-bold text-white text-center">
              {story.name || "Person"}
            </h4>
          </div>
          <section
            id="story-image"
            className={`${showStory} w-full h-screen absolute top-0 left-0 bg-[#000000f4] z-50`}
          >
            <span className="absolute top-0 cursor-pointer left-0 text-gray-400 text-2xl sm:text-3xl lg:text-4xl">
              <FaArrowLeft className="m-4" />
            </span>
            <figure className="p-1 mx-auto h-screen flex items-center justify-center object-contain">
              <img src={story.picture} className="h-[99vh] object-contain" />
            </figure>
            <span className="absolute top-0 cursor-pointer right-0 text-gray-400 text-2xl sm:text-3xl lg:text-4xl">
              <RxCross2 className="m-4" />
            </span>
          </section>
        </div>
      )}
    </>
  );
};



const MyStory = ({ story, index, onStoryAdded }) => {
  const storyStyle = {
    backgroundImage: `url(${story.picture})`,
  };

  return (
    <>
      {story.picture && (
        <div
          key={index}
          id="story"
          className={`story overflow-hidden bg-cover ml-2 min-w-28 h-44 rounded-lg shadow-lg`}
          style={storyStyle}
        >
          <div className="p-2 bg-gradient-to-b from-transparent from-50% via- to-[#000000ee] to-100% w-full h-full flex flex-col items-center justify-end gap-1">
            <CreateStoryForm onStoryAdded={onStoryAdded} />
            <h4 className="text-xs font-bold text-white text-center">
              {story.name || "Person"}
            </h4>
          </div>
        </div>
      )}
    </>
  );
};

