import { React, useState, useEffect } from "react";
import Stories from "./Stories";
import FindPeople from "./FindPeople";
import Header from "../Header";
import Sidebar from "../sidebar/Sidebar";
import CreatePost from "./CreatePost";
import UserPost from "./UserPost";


const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(true);

  const handlePostAdded = () => {
    fetchPosts();
  };

  const fetchPosts = async () => {
    try {
      //API call heres
      const response = await fetch(
        "https://connectify-backend-2uq0.onrender.com/api/v1/posts/get-all-posts"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const allPosts = await response.json();

      setPosts(allPosts.data); // our array is stored in data
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const [isSidebarVisible, setSidebarVisible] = useState(false);

  // Function to toggle sidebar in small screen
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <div className="">
        <Header onToggleSidebar={toggleSidebar} />
        <Sidebar isVisible={isSidebarVisible} />
        <div className="lg:pl-[270px] pt-20 h-screen overflow-hidden flex justify-start">
          <section className="w-full lg:w-9/12 h-screen overflow-y-scroll hide-scrollbar">
            <div className="mb-36 mx-auto xl:max-w-[650px]">
              <Stories />
              <CreatePost onPostAdded={handlePostAdded} />
              {loading && (
                <p className="m-5 w-full text-xl text-gray-700">
                  Loading posts...
                </p>
              )}
              {posts.map((post, index) => {
                return <UserPost post={post} index={index} onPostAdded={handlePostAdded}/>;
              })}
            </div>
          </section>
          <div className="hidden lg:block h-full mx-2 overflow-scroll hide-scrollbar">
            <FindPeople />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
