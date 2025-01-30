import React, { useState } from "react";
import Cookies from "js-cookie";
import NoUser from "../../assets/no-user.jpg";
import { RxCrossCircled } from "react-icons/rx";
import { NavLink, useNavigate } from "react-router-dom";

const SearchUser = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const token = Cookies.get("accessToken");

      if (!token) {
        throw new Error("No access token found in cookies");
      }

      const response = await fetch(
        `https://connectify-backend-2uq0.onrender.com/api/v1/users/search-user?keyword=${query}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      setData(result.data || []);
      console.log(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="mx-auto sm:my-10 py-6 max-w-lg w-screen h-screen sm:max-h-[680px] flex flex-col items-center sm:rounded-lg bg-gray-50 relative">
      <NavLink
        to="/"
        className="p-1 text-2xl ms-auto text-primaryColor bg-transparent rounded-lg absolute top-2 right-2"
      >
        <RxCrossCircled />
      </NavLink>
      <h1 className="text-3xl font-bold mb-5 text-primaryColor">
        Search Users
      </h1>

      <div className=" px-4 flex items-center mb-4 w-full max-w-lg">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter username to search"
          className="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primaryColor"
        />
        <button
          onClick={handleSearch}
          className="bg-primaryColor text-white px-5 py-3 rounded-r-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor"
        >
          Search
        </button>
      </div>

      {error && <p className="text-start text-gray-600">No User Found</p>}
      {loading ? (
        <p className="text-gray-700">Loading...</p>
      ) : (
        <div className="px-4 grid grid-cols-1 gap-4 w-full max-w-6xl overflow-y-scroll hide-scrollbar">
          {data.length > 0 &&
            !error &&
            data.map((user) => (
              <div
                key={user._id} // user id
                onClick={() => navigate(`/profile/${user._id}`)}
                className="p-4 bg-white flex items-center gap-2 shadow-md rounded-lg border border-gray-200 hover:shadow-lg"
              >
                <div className="w-14 h-14 rounded-full overflow-hidden bg-primaryColor">
                  <img
                    src={user.avatar || NoUser}
                    alt="user-profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-start text-primaryColor">
                    {user.username || "No Name"}
                    {/* Adjust field names based on API */}
                  </h2>
                  <p className="mt-1 text-sm text-start text-gray-600">
                    {user.fullName || "No Email"}
                    {/* Adjust field names based on API */}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchUser;
