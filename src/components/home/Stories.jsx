import React, { useState, useEffect } from "react";
import CreateStoryForm from "./CreateStoryForm";
import Cookies from "js-cookie";
import SingleStory from "./SingleStory";
import StoryShimmer from "./StoryShimmer";

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
      // const fetchedStories = data.data.map((story) => ({
      //   name: story.fullName || story.username,
      //   // storyId : story._id,
      //   profileImage: story.avatar,
      //   picture: story.stories[0],
      //   description: story.description,
      //   createdAt: story.createdAt,
      // }));

      setStories(data);
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

  // if (loading) return <div>Loading stories...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="pl-1 pr-2 w-full lg:max-w-[] z-0">
      <div className="-mt-1 md:mt-3 lg:mt-5 h-48 w-full story-section flex items-center overflow-scroll hide-scrollbar">
        <MyStory
          story={yourStory}
          index={"yourStory"}
          onStoryAdded={handleStoryAdded}
        />

        {loading ? ( <StoryShimmer/>
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
          className={`story overflow-hidden bg-gray-50 border bg-cover ml-2 min-w-28 h-44 rounded-lg shadow-lg`}
          style={storyStyle}
        >
          <div className="p-2 bg-gradient-to-b from-transparent from-0%  to-[#000000ac] to-100% w-full h-full flex flex-col items-center justify-end gap-1">
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

