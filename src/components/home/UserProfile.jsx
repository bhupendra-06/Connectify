import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { SlSettings } from "react-icons/sl";
import { ClipLoader } from "react-spinners";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import NoUser from '../../assets/no-user.jpg';


const UserProfile = () => {
  const [myProfile, setMyProfile] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false); // Follow state

  const [loading, setLoading] = useState(false); // Loading state for button
  const { id } = useParams();
  const token = Cookies.get("accessToken");
  const MyOwnerId = Cookies.get("MyOwnerId");
  const navigate = useNavigate();
  const goToSettings = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        navigate("/settings");
      });
    } else {
      navigate("/settings");
    }
  };

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
      <div className="max-w-4xl mx-auto p-3 border min-h-screen">
        <div className="flex justify-between">
          <Link to="/home">
            <GoArrowLeft className="inline-block text-3xl sm:m-1 sm:text-3xl" />
          </Link>
          {myProfile.data._id === MyOwnerId && (
            <Link onClick={goToSettings}>
              <SlSettings className="inline-block text-gray-600 text-3xl sm:m-1 sm:text-3xl" />
            </Link>
          )}
        </div>
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 border-b pb-6 sm:pt-4">
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
                      ? "text-white bg-primaryColor hover:bg-primaryColor" // Follow back style
                      : "text-white bg-primaryColor hover:bg-primaryColor" // Follow style
                  }`}
                >
                  {loading ? (
                    <ClipLoader
                      size={14}
                      color=""
                      className="mx-5 text-gray-300"
                    />
                  ) : isFollowing ? (
                    "Following"
                  ) : myProfile.data.isFollowedBy ? (
                    "Follow Back"
                  ) : (
                    "Follow"
                  )}
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
        <div className="mt-4 grid grid-cols-3 gap-1 sm:gap-4">
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
