import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RxCrossCircled } from "react-icons/rx"; // Close icon
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"; // Navigation arrows

const InstagramCarousel = ({ post, currentIndex, removePostImages }) => {
  const settings = {
    initialSlide: currentIndex,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    nextArrow: <CustomArrowNext />,
    prevArrow: <CustomArrowPrev />,
    responsive: [
      {
        breakpoint: 768, // Mobile and tablet view
        settings: {
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="w-screen h-screen fixed top-0 left-0 z-50 bg-black flex flex-col">
      <div className="relative w-full h-[93vh] sm:h-screen flex justify-center items-center">
        {/* Close Button */}
        <RxCrossCircled
          onClick={removePostImages}
          className="text-white text-4xl absolute top-4 right-4 cursor-pointer z-10"
        />

        {/* Image Carousel */}
        <Slider
          {...settings}
          className="w-[95%] h-[50%] sm:h-[90%] bg-white/90 sm:bg-black flex items-center justify-center overflow-hidden"
        >
          {post?.postFile &&
            post.postFile.map((url, index) => (
              <div
                key={`slide-${index}`} // Unique key to ensure proper rendering
                className="flex justify-center items-center relative"
              >
                <img
                  src={url}
                  alt={`Slide ${index}`}
                  className="h-[50vh] sm:h-[90vh] w-full object-contain "
                  loading="lazy"
                />
                {post?.postFile && (
                  <div className="p-[0.4rem] w-fit h-fit text-xs sm:text-sm text-white bg-gray-950/90 flex items-center gap-0.5 border border-gray-700 rounded-full absolute right-5 sm:right-1/2 top-5 sm:top-[93%] translate-x-1/2 z-50">
                    <span>{index + 1}</span>
                    <span>/</span>
                    <span>{post.postFile.length}</span>
                  </div>
                )}
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};

// Custom Next Arrow
const CustomArrowNext = ({ onClick }) => (
  <div
    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 hidden md:block"
    onClick={onClick}
  >
    <IoIosArrowForward className="text-white text-4xl" />
  </div>
);

// Custom Prev Arrow
const CustomArrowPrev = ({ onClick }) => (
  <div
    className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 hidden md:block"
    onClick={onClick}
  >
    <IoIosArrowBack className="text-white text-4xl" />
  </div>
);

export default InstagramCarousel;
