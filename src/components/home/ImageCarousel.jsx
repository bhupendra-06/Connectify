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
      <div className="relative h-full flex items-center justify-center">
        {/* Close Button */}
        <RxCrossCircled
          onClick={removePostImages}
          className="text-white text-4xl absolute top-4 right-4 cursor-pointer z-10"
        />

        {/* Image Carousel */}
        <Slider {...settings} className="w-full h-full">
          {post.postFile &&
            post.postFile.map((url, index) => (
              <div
                key={`slide-${index}`} // Unique key to ensure proper rendering
                className="flex justify-center items-center h-full outline-none relative"
              >
                <img
                  src={url}
                  alt={`Slide ${index}`}
                  className="w-[100vw] h-[93vh] sm:h-[100vh] left-1/2 top-1/2 object-contain"
                  loading="lazy"
                />
                {post.postFile.length > 0 && (
                  <div className="p-[0.4rem] text-xs sm:text-sm text-white bg-gray-950/90 flex items-center gap-0.5 border border-gray-700 rounded-full absolute bottom-5 sm:bottom-3 right-1/2 translate-x-1/2 z-50">
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