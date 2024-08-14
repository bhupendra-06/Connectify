import React from "react";
import UserPost from "./UserPost";
import posts from "./posts.json";
import Stories from "./Stories";
import FindPeople from "./FindPeople";

const Home = () => {
  return (
  <>
    <div className="">
      <div className="lg:pl-[270px] pt-20 h-screen overflow-y-scroll flex justify-center">
          <section className="h-full mx-auto overflow-x-hidden hide-scrollbar xl:max-w-[]">
            <Stories />
            {posts.map((post, index) => {
              return <UserPost post={post} index={index} />;
            })}
          </section>
          <div className="hidden lg:block min-w-[380px] h-full overflow-scroll hide-scrollbar">
            <FindPeople/>
          </div>
      </div>
    </div>
  </>
  );
};

export default Home;
