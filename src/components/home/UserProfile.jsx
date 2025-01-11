import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const posts = [
  "https://images.pexels.com/photos/14454192/pexels-photo-14454192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/3792581/pexels-photo-3792581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/14454192/pexels-photo-14454192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/3792581/pexels-photo-3792581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/14454192/pexels-photo-14454192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "",
  "",
];

const NoUser =
// "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA3W3oppN7sdVCsUWwwnPIn9pX6E6G2UW70w&s";
"https://images.pexels.com/photos/3792581/pexels-photo-3792581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";


const UserProfile = () => {
  const [myProfile, setMyProfile] = useState(null);
  const MyOwnerId = Cookies.get("MyOwnerId");

  const fetchMyProfile = async () => {
    try {
      const token = Cookies.get("accessToken");

      if (!token) {
        throw new Error("No access token found in cookies");
      }
      const response = await fetch(
        `https://connectify-backend-2uq0.onrender.com/api/v1/users/profile/${MyOwnerId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }
      const data = await response.json();
      setMyProfile(data);
      console.log(myProfile);
    } catch (err) {
      console.error("Error fetching profile: ", err);
    } finally {
      console.log("end");
    }
  };
  useEffect(() => {
    fetchMyProfile();
  }, []);
  const navigate = useNavigate(); // to navigate back

  return (
    myProfile && (
      <div className="max-w-4xl mx-auto p-4">
        <Link onClick={() => navigate(-1)}>
          {/* go to previous page in the routing path */}
          <GoArrowLeft className="inline-block m-1 text-xl sm:text-3xl" />
        </Link>
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 border-b pb-6">
          {/* Profile Picture */}
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
            <img
              src={myProfile.data.avatar || NoUser}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Details */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-4 mb-4">
              <h1 className="text-2xl font-bold">{myProfile.data.username}</h1>
              {myProfile.data._id === MyOwnerId ? (
                <button className="px-4 py-2 text-sm font-semibold bg-white border border-gray-400 rounded-lg ">
                  Edit Profile
                </button>
              ) : (
                <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                  Follow
                </button>
              )}
            </div>

            {/* Stats */}
            <div className="flex justify-center md:justify-start space-x-8">
              <div>
                <span className="font-bold">{myProfile.data.posts.length}</span>{" "}
                posts
              </div>
              <div>
                <span className="font-bold">
                  {myProfile.data.followerCount}
                </span>{" "}
                followers
              </div>
              <div>
                <span className="font-bold">
                  {myProfile.data.followingCount}
                </span>{" "}
                following
              </div>
            </div>

            {/* Bio */}
            <div className="mt-4">
              <p className="font-semibold uppercase">
                {myProfile.data.fullName}
              </p>
              <p className="text-sm">{myProfile.data.bio}</p>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6">
          {myProfile.data.posts.map((post, index) => (
            <div
              key={index}
              className="relative bg-gray-200 w-full aspect-square overflow-hidden"
            >
              <img
                src={post.postFile[0]}
                alt={`Post ${index + 1}`}
                className="w-full h-full object-cover hover:opacity-80"
              />
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default UserProfile;
