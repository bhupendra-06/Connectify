import React from "react";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import stories from "./stories.json";

const yourStory = {
  name: "Add Story",
  profileImage:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOSyWpWSVvNFScD4JijQAi4C2zjhFnDOESQ&s",
  picture: "https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg",
};

// STORIES COMPONENT STARTS HERE
const Stories = () => {
  return (
    <div className="pl-1 pr-2 w-full lg:max-w-[] z-0">
      <div className="-mt-1 md:mt-3 lg:mt-5 h-48 w-full story-section flex items-center overflow-scroll hide-scrollbar">
        <SingleStory story={yourStory} index={"yourStory"} />
        {stories.map((story, index) => {
          {
            return <SingleStory story={story} index={index} />;
          }
        })}
      </div>
    </div>
  );
};

export default Stories;

const SingleStory = ({ story, index }) => {
  const storyStyle = {
    backgroundImage: `url(${story.picture})`,
  };

  const [showStory, setShowStory] = useState("hidden");
  const biggerStory = () => {
    setShowStory("");
    setTimeout(() => {
      setShowStory("hidden");
      console.log(showStory);
    }, 1800);
  };
  useEffect(() => {
    console.log(showStory);
  }, [showStory]);

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
        {/* SINGLE STORY CODE STARTS HERE */}
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
          {/* FULL SCREEN STROY VIEW*/}
          <section
            id="story-image"
            className={`${showStory} w-full h-screen absolute top-0 left-0 bg-[#000000f4] z-50`}
          >
            <span className="absolute top-0 left-0 text-gray-400 text-2xl sm:text-3xl lg:text-4xl">
              <FaArrowLeft className="m-4" />
            </span>
            <figure className="p-1 mx-auto h-screen flex items-center justify-center object-contain">
              <img src={story.picture} className="h-[99vh] object-contain" />
            </figure>
          </section>
        </div>
      )}
    </>
  );
};
