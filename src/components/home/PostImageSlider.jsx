import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const PostImageSlider = (images) => {
    
  const [currentIndex, setCurrentIndex] = useState(0);
  const goBack = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
};
const goForward = () => {
    const isLastImage = currentIndex === images.length-1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    console.log(currentIndex);
  };
//   const images = post.pictures;
  const im = [
    "https://images.pexels.com/photos/4226881/pexels-photo-4226881.jpeg?auto=compress&cs=tinysrgb&w=400",

    "https://images.pexels.com/photos/3844788/pexels-photo-3844788.jpeg?auto=compress&cs=tinysrgb&w=600",

    "https://images.pexels.com/photos/4226881/pexels-photo-4226881.jpeg?auto=compress&cs=tinysrgb&w=400",

    "https://images.pexels.com/photos/3844788/pexels-photo-3844788.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  return (
    <div className="p-2 w-full h-full bg-red-200 flex items-center ">
      <img
        src={`${images[currentIndex]}`}
        className="w-[80vw] h-[90vh] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain rounded-sm"
      />
      <IoIosArrowBack
        onClick={goBack}
        className="text-5xl text-gray-500 border absolute left-10 top-1/2 -translate-y-1/2 "
      />
      <IoIosArrowForward onClick={goForward} className="text-5xl text-gray-500 border absolute right-10 top-1/2 -translate-y-1/2 " />
    </div>
  );
};

export default PostImageSlider;
