import React from "react";
import Header from "../Header";
import UserPost from "./UserPost";
import posts from "./posts.json";
import Sidebar from "../sidebar/Sidebar";
import Stories from "./Stories";
import FindPeople from "./FindPeople";

const Home = () => {
  return (
  <>
    <div className="">
      <Header />
      <div className="lg:pl-[270px] pt-20 h-screen overflow-y-scroll flex justify-center">
          <section className="h-full overflow-x-hidden hide-scrollbar xl:max-w-[650px]">
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
