import React from "react";

const MyProfile = () => {
  const user = {
    username: "Raj Dewangan",
    profilePicture: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    followers: 1200,
    following: 300,
    posts: [
      "https://images.pexels.com/photos/2377463/pexels-photo-2377463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/10739659/pexels-photo-10739659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/2377463/pexels-photo-2377463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/10739659/pexels-photo-10739659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/2377463/pexels-photo-2377463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/10739659/pexels-photo-10739659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      {/* Profile Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-4">
          {/* Profile Picture */}
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
            <img
              src={user.profilePicture}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <div className="flex gap-8 mt-2">
              <div>
                <span className="font-bold">{user.posts.length}</span>
                <span className="ml-1 text-gray-600">Posts</span>
              </div>
              <div>
                <span className="font-bold">{user.followers}</span>
                <span className="ml-1 text-gray-600">Followers</span>
              </div>
              <div>
                <span className="font-bold">{user.following}</span>
                <span className="ml-1 text-gray-600">Following</span>
              </div>
            </div>
          </div>

          <button className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Posts Grid Section */}
      <div className="max-w-4xl mx-auto mt-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Posts</h2>
        <div className="grid grid-cols-3 gap-4 border p-1 bg-gray-100 rounded-sm">
          {user.posts.map((post, index) => (
            <div
              key={index}
              className="aspect-square bg-gray-200 overflow-hidden rounded-lg"
            >
              <img
                src={post}
                alt={`Post ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
