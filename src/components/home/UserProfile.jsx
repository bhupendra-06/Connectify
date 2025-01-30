import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { SlSettings } from "react-icons/sl";
import { ClipLoader } from "react-spinners";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import moment from "moment"; // for date formatting
import NoUser from "../../assets/no-user.jpg";
import { RxCrossCircled } from "react-icons/rx";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import SinglePost from "./SinglePost";

const UserProfile = () => {
  const [myProfile, setMyProfile] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false); // Follow state
  const [open, setOpen] = useState(false); // For form modal
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [seeMore, setSeeMore] = useState(false);
  const [see, setSee] = useState("See More.");
  const [loading, setLoading] = useState(false); // Loading state for button
  const { id } = useParams();
  const token = Cookies.get("accessToken");
  const MyOwnerId = Cookies.get("MyOwnerId");
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({
    username: "",
    fullName: "",
    bio: "",
    avatar: "",
    coverImage: "",
    password: "",
  });

  const goToSettings = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        navigate("/settings");
      });
    } else {
      navigate("/settings");
    }
  };

  const seeMoreFunction = () => {
    setSeeMore(!seeMore);
    setSee(see === "See More." ? "See Less." : "See More.");
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
        // console.log(data.data);
        setIsFollowing(data?.data?.isFollowing); // Initialize follow state
        setUpdatedProfile({
          username: data.data.username,
          fullName: data.data.fullName || "",
          bio: data.data.bio,
          avatar: data.data.avatar,
          coverImage: data.data.coverImage,
          password: "",
        });
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

  const handlePostClick = (index) => {
    setSelectedPost(index); // Store the clicked post data
    setOpen(true);
  };

  const nextSlide = () => {
    setCurrentIndex(
      (prev) => (prev + 1) % myProfile.data.posts[selectedPost].postFile.length
    );
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + myProfile.data.posts[selectedPost].postFile.length) %
        myProfile.data.posts[selectedPost].postFile.length
    );
  };
  const postBack = () => {
    setOpen(false);
    setSee("See More.");
    setSeeMore(false);
    setCurrentIndex(0);
  };

  const openEditModal = () => {
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  if (!myProfile)
    return (
      <div className="w-screen h-screen text-3xl text-gray-600 flex items-center justify-center">
        <p>Loading Profile...</p>
      </div>
    );

  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
      const formData = new FormData();

      if (myProfile?.data?.username !== updatedProfile.username) {
        formData.append("username", updatedProfile.username);
      }
      if (updatedProfile.fullName) {
        formData.append("fullName", updatedProfile.fullName);
      }
      if (updatedProfile.bio) {
        formData.append("bio", updatedProfile.bio);
      }
      if (updatedProfile.password) {
        formData.append("password", updatedProfile.password);
      }

      if (updatedProfile.avatar) {
        formData.append("avatar", updatedProfile.avatar);
      }
      if (updatedProfile.coverImage) {
        formData.append("coverImage", updatedProfile.coverImage);
      }

      const response = await fetch(
        `https://connectify-backend-2uq0.onrender.com/api/v1/users/update-profile`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      setShowEditModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  console.log("myprofile", myProfile);

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
                <button
                  className="px-4 py-2 text-sm font-semibold bg-white border border-gray-400 rounded-lg"
                  onClick={openEditModal}
                >
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
                <span className="font-bold">
                  {myProfile.data?.posts?.length}
                </span>{" "}
                posts
              </div>
              <div>
                <span className="font-bold">
                  {myProfile.data?.followerCount}
                </span>{" "}
                followers
              </div>
              <div>
                <span className="font-bold">
                  {myProfile.data?.followingCount}
                </span>{" "}
                following
              </div>
            </div>

            <div className="mt-4">
              <p className="font-semibold uppercase">
                {myProfile.data?.fullName}
              </p>
              <p className="text-sm">{myProfile.data?.bio}</p>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="mt-4 grid grid-cols-3 gap-1 sm:gap-4">
          {myProfile.data?.posts?.map((post, index) => (
            <div
              onClick={() => {
                handlePostClick(index);
              }}
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
        {/* ON POST CLICK SINGLE POST */}
        {open && myProfile && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={postBack} // Clicking outside closes modal
          >
            <div
              className="bg-white p-4 pt-8 rounded-lg shadow-lg w-11/12 max-w-[500px] max-h-screen overflow-auto mt-2 relative"
              onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
            >
              <button
                onClick={postBack}
                className="absolute top-1 right-2 text-lg text-gray-600 hover:text-gray-900"
              >
                ✖
              </button>
              <section className="">
                <div
                  onClick={postBack}
                  className="p-3 flex items-center gap-2 border rounded-lg"
                >
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-primaryColor">
                    <img
                      src={myProfile.data.avatar || NoUser}
                      alt="user-profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-start text-primaryColor">
                      {myProfile.data.username || "User"}
                    </h2>
                    <p className="mt-1 text-sm text-start text-gray-600">
                      {myProfile.data.fullName || "User"}
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-gray-600 text-justify">
                  {/* {myProfile.data.posts[selectedPost].description} */}
                  {myProfile.data.posts[selectedPost].description.length >
                  200 ? (
                    <>
                      {seeMore
                        ? myProfile.data.posts[selectedPost].description
                        : myProfile.data.posts[selectedPost].description.slice(
                            0,
                            160
                          ) + ".."}{" "}
                      <span
                        onClick={seeMoreFunction}
                        className="text-primaryColor font-semibold cursor-pointer"
                      >
                        {see}
                      </span>
                    </>
                  ) : (
                    myProfile.data.posts[selectedPost].description
                  )}
                </p>
                <div className="flex flex-col items-center justify-center w-fit pb-2 bg-gray-100">
                  <div className="relative w-full aspect-square overflow-hidden rounded-sm shadow-lg">
                    {/* Images */}
                    <img
                      src={
                        myProfile.data.posts[selectedPost].postFile[
                          currentIndex
                        ]
                      }
                      alt={`Slide ${currentIndex + 1}`}
                      className="w-full h-full object-contain transition-transform duration-500"
                    />

                    {/* Left Button */}
                    <button
                      onClick={prevSlide}
                      className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800/70 text-white p-2 rounded-full hover:bg-gray-600"
                    >
                      ❮
                    </button>

                    {/* Right Button */}
                    <button
                      onClick={nextSlide}
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800/70 text-white p-2 rounded-full hover:bg-gray-600"
                    >
                      ❯
                    </button>
                  </div>

                  {/* Dots Navigation */}
                  <div className="flex mt-4">
                    {myProfile.data.posts[selectedPost].postFile.map(
                      (_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 mx-1 rounded-full ${
                            index === currentIndex
                              ? "bg-primaryColor"
                              : "bg-gray-300"
                          }`}
                          onClick={() => setCurrentIndex(index)}
                        />
                      )
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}

        {showEditModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-xl font-bold mb-4 text-primaryColor text-center">
                Edit Profile
              </h2>
              <label className="font-semibold">Username</label>
              <input
                type="text"
                value={updatedProfile.username}
                onChange={(e) =>
                  setUpdatedProfile({
                    ...updatedProfile,
                    username: e.target.value,
                  })
                }
                className="w-full border p-2 mb-2"
              />
              <label className="font-semibold">Full Name</label>
              <input
                type="text"
                value={updatedProfile.fullName}
                onChange={(e) =>
                  setUpdatedProfile({
                    ...updatedProfile,
                    fullName: e.target.value,
                  })
                }
                className="w-full border p-2 mb-2"
              />
              <label className="font-semibold">Bio</label>
              <textarea
                value={updatedProfile.bio}
                onChange={(e) =>
                  setUpdatedProfile({ ...updatedProfile, bio: e.target.value })
                }
                className="w-full border p-2 mb-2 resize-none h-20 "
              ></textarea>
              <label className="font-semibold">Profile Image</label>
              <input
                type="file"
                onChange={(e) =>
                  setUpdatedProfile({
                    ...updatedProfile,
                    avatar: e.target.files[0],
                  })
                }
                className="w-full border p-2 mb-2"
              />
              <label className="font-semibold">Cover Image</label>
              <input
                type="file"
                onChange={(e) =>
                  setUpdatedProfile({
                    ...updatedProfile,
                    coverImage: e.target.files[0],
                  })
                }
                className="w-full border p-2 mb-2"
              />
              <label className="font-semibold">New Password</label>
              <input
                type="password"
                value={updatedProfile.password}
                onChange={(e) =>
                  setUpdatedProfile({
                    ...updatedProfile,
                    password: e.target.value,
                  })
                }
                className="w-full border p-2 mb-4"
                placeholder="Enter new password"
              />
              <button
                onClick={handleProfileUpdate}
                className="px-4 py-2 bg-primaryColor text-white rounded"
                disabled={loading}
              >
                {" "}
                {loading ? (
                  <ClipLoader size={20} color="#ffffff" className="mx-5" />
                ) : (
                  "Save Changes"
                )}
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="ml-2 px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default UserProfile;
