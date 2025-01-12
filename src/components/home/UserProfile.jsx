import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import Cookies from "js-cookie";

const NoUser =
  "https://i.pinimg.com/736x/16/18/20/1618201e616f4a40928c403f222d7562.jpg";

const UserProfile = () => {
  const [myProfile, setMyProfile] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false); // Follow state

  const [loading, setLoading] = useState(false); // Loading state for button
  const { id } = useParams();
  const token = Cookies.get("accessToken");
  const MyOwnerId = Cookies.get("MyOwnerId");

  useEffect(() => {
    if (!token) {
      throw new Error("No access token found in cookies");
    }

    const fetchMyProfile = async () => {
      try {
        const response = await fetch(
          `https://connectify-backend-2uq0.onrender.com/api/v1/users/profile/${id}`,
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
        setIsFollowing(data?.data?.isFollowing); // Initialize follow state
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchMyProfile();
  }, [id]);

  const followToggle = async () => {
    setLoading(true); // Show loading state on button
    try {
      const response = await fetch(
        `https://connectify-backend-2uq0.onrender.com/api/v1/users/follow/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      // Toggle follow state locally and update follower count
      const updatedFollowerCount = isFollowing
        ? myProfile.data.followerCount - 1
        : myProfile.data.followerCount + 1;

      setMyProfile((prevProfile) => ({
        ...prevProfile,
        data: {
          ...prevProfile.data,
          followerCount: updatedFollowerCount, // Update follower count
        },
      }));

      // Toggle follow state locally
      setIsFollowing((prevState) => !prevState);

      console.log("Follow/Unfollow action successful"); // Debugging
    } catch (err) {
      console.error("Error during Follow/Unfollow:", err);
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  if (!myProfile)
    return (
      <div className="w-screen h-screen text-3xl text-gray-600 flex items-center justify-center">
        <p>Loading Profile...</p>
      </div>
    );

  return (
    myProfile && (
      <div className="max-w-4xl mx-auto p-4">
        <Link to="/home">
          <GoArrowLeft className="inline-block m-1 text-xl sm:text-3xl" />
        </Link>

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 border-b pb-6">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-gray-200">
            <img
              src={myProfile.data.avatar || NoUser}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-4 mb-4">
              <h1 className="text-2xl font-bold">{myProfile.data.username}</h1>
              {myProfile.data._id === MyOwnerId ? (
                <button className="px-4 py-2 text-sm font-semibold bg-white border border-gray-400 rounded-lg">
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={followToggle}
                  disabled={loading}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg ${
                    isFollowing
                      ? "text-black bg-white border-2" // Following style
                      : myProfile.data.isFollowedBy
                      ? "text-white bg-blue-500 hover:bg-blue-600" // Follow back style
                      : "text-white bg-blue-500 hover:bg-blue-600" // Follow style
                  }`}
                >
                  {loading
                    ? "Loading..."
                    : isFollowing
                    ? "Following"
                    : myProfile.data.isFollowedBy
                    ? "Follow Back"
                    : "Follow"}
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
