import React from "react";
import UserPost from "./UserPost";
import posts from "./posts.json";
import Stories from "./Stories";
import FindPeople from "./FindPeople";
import Header from "../Header"
import Sidebar from "../sidebar/Sidebar"
import CreatPost from "./CreatPost";

const Home = () => {
  return (
    <>
      <div className="">
      <Header />
      <Sidebar/>
        <div className="lg:pl-[270px] pt-20 h-screen overflow-hidden flex justify-start">
          <section className="w-full lg:w-9/12 h-screen overflow-y-scroll hide-scrollbar">
            <div className=" mx-auto xl:max-w-[650px]">
              <Stories />
              <CreatPost />
              {posts.map((post, index) => {
                return <UserPost post={post} index={index} />;
              })}
            </div>
          </section>
          <div className="hidden lg:block h-full mx-auto overflow-scroll hide-scrollbar">
            <FindPeople />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
