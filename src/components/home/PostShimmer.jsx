import React from "react";

const PostShimmer = () => {
  return (
    <>
    <SingleShimmer/>
    <SingleShimmer/>
    <SingleShimmer/>
    <SingleShimmer/>
    <SingleShimmer/>
    <SingleShimmer/>
    <SingleShimmer/>
    </>
  );
};

export default PostShimmer;


const SingleShimmer = ()=>{
return(
  <div
  role="status"
  className="m-2 mt-0 p-4 border-2 shadow-md shadow-gray-200 space-y-5 text-center animate-pulse"
>
  <div className="flex justify-start items-center">
    <div className="h-14 w-14 bg-gray-200 rounded-full"></div>
    <div>
      <div className="mx-2 mb-2 h-5 w-44 bg-gray-200 rounded-full"></div>
      <div className="mx-3 h-2 w-20 bg-gray-200 rounded-full"></div>
    </div>
  </div>
  <div className="m-1 h-3 max-w-96 w-full bg-gray-300 rounded-full"></div>
  <div className="m-1 h-3 max-w-96 w-full bg-gray-300 rounded-full"></div>
  <div className="m-1 flex items-center justify-center w-full h-48 bg-gray-200 rounded sm:w-full md:w-96 ">
    <svg
      className="w-10 h-10 text-gray-300 "
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 18"
    >
      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
    </svg>
  </div>
  <span className ="sr-only">Loading...</span>
</div>
)
}