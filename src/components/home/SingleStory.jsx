import React, { useState, useEffect, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const SingleStory = ({ story, index, onStoryAdded }) => {
  const [showStory, setShowStory] = useState("hidden");
  const [showOptions, setShowOptions] = useState(false);
  const storyRef = useRef();

  const storyStyle = {
    backgroundImage: `url(${story.stories[0].postFile[0]})`,
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
      setShowStory("");
      setTimeout(() => {
          setShowStory("hidden");
        }, 1800);

    // setShowStory("");
    // if (storyRef.current.requestFullscreen) {
    //   storyRef.current.requestFullscreen();
    // } else if (storyRef.current.webkitRequestFullscreen) {
    //   // For Safari
    //   storyRef.current.webkitRequestFullscreen();
    // }
    // setTimeout(() => {
    //   setShowStory("hidden");
    //   if (document.exitFullscreen) {
    //     document.exitFullscreen();
    //   } else if (document.webkitExitFullscreen) {
    //     // For Safari
    //     document.webkitExitFullscreen();
    //   }
    // }, 1800);
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
      {story.stories && (
        <div
          key={index}
          id="story"
          className={`story overflow-hidden bg-cover bg-center ml-2 min-w-28 h-44 rounded-lg shadow-lg`}
          style={storyStyle} // For background image
          onClick={biggerStory}
        >
          <div className="p-2 bg-gradient-to-b from-transparent from-0% via-gray-900/10 via-50% to-[#000000ee] to-100% w-full h-full flex flex-col items-center justify-end gap-1">
            <figure className="mx-auto w-10 h-10 object-cover border border-[#959595] rounded-full overflow-hidden">
              <img
                className="rounded-full w-10 h-10 object-cover"
                src={
                  story.avatar ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA3W3oppN7sdVCsUWwwnPIn9pX6E6G2UW70w&s"
                }
              />
            </figure>
            <h4 className="text-xs font-bold text-white text-center">
              {story.username || "Person"}
            </h4>
          </div>
          {/* Full Screen Preview of Story */}
          <section
            id="story-image"
            ref={storyRef}
            className={`${showStory} w-full h-screen absolute top-0 left-0 bg-[#000000f4] z-50`}
          >
            <span className="absolute top-0 cursor-pointer left-0 text-gray-400 text-2xl sm:text-3xl lg:text-4xl">
              <FaArrowLeft className="m-4 drop-shadow-sm" />
            </span>
            <figure className="p-1 mx-auto h-screen w-screen flex items-start justify-center">
              <img
                src={story.stories[0].postFile[0]}
                className="h-[90%] aspect-[6/10] object-cover object-center"
              />
            </figure>
          </section>
        </div>
      )}
    </>
  );
};
export default SingleStory;
