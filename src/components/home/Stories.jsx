import React from "react";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import stories from "./stories.json";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { FaExclamationTriangle } from "react-icons/fa";
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
        <MyStory story={yourStory} index={"yourStory"} />
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
    }, 1800);
  };
  // useEffect(() => {
  //   console.log(showStory);
  // }, [showStory]);

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

const MyStory = ({ story, index }) => {
  const [open, setOpen] = useState(false); // For form modal

  const storyStyle = {
    backgroundImage: `url(${story.picture})`,
  };

  const [showStory, setShowStory] = useState("hidden");
  const biggerStory = () => {
    setShowStory("");
    setTimeout(() => {
      setShowStory("hidden");
    }, 1800);
  };
  // useEffect(() => {
  //   console.log(showStory);
  // }, [showStory]);

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
            {/* STORY MODAL */}
            {story && (
              <>
                <Dialog open={open} onClose={setOpen} className="relative z-10">
                  <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/90"
                  />

                  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="mx-auto flex min-h-full max-w-2xl items-center justify-center p-4 text-center sm:items-center lg:p-0">
                      <DialogPanel>
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                          <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:size-10"></div>
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                              <DialogTitle
                                as="h3"
                                className="text-base font-semibold text-gray-900"
                              >
                                Post Story
                              </DialogTitle>
                              <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                  Are you sure you want to post your
                                  personal story from your account? All of your data will be shared. This action cannot be undone.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                          <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            data-autofocus
                            onClick={() => setOpen(false)}
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          >
                            No
                          </button>
                        </div>
                      </DialogPanel>
                    </div>
                  </div>
                </Dialog>
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="mx-auto text-center inline-flex w-auto justify-center rounded-full bg-blue-600 px-3 py-1 text-2xl font-medium text-white "
                > 
                  +
                </button>
              </>
            )}

            <h4 className="text-xs font-bold text-white text-center">
              {story.name || "Person"}
            </h4>
          </div>
          {/* FULL SCREEN STROY VIEW*/}
          {/* <section
            id="story-image"
            className={`${showStory} w-full h-screen absolute top-0 left-0 bg-[#000000f4] z-50`}
          >
            <span className="absolute top-0 left-0 text-gray-400 text-2xl sm:text-3xl lg:text-4xl">
              <FaArrowLeft className="m-4" />
            </span>
            <figure className="p-1 mx-auto h-screen flex items-center justify-center object-contain">
              <img src={story.picture} className="h-[99vh] object-contain" />
            </figure>
          </section> */}
        </div>
      )}
    </>
  );
};
