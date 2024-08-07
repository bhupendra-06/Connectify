import React from "react";
import Header from "../Header";
import UserPost from "./UserPost";
import posts from "./posts.json";


const Home = () => {
  return (
    <>
      <Header />
      <section className="m-2 sm:mx-auto max-w-[600px] h-screen border shadow-lg">
        {posts.map((post, index) => {
          return <UserPost post={post} index={index} />;
        })}
      </section>
    </>
  );
};

export default Home;
