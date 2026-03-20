import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ClipLoader } from "react-spinners";
import { FaSignInAlt } from "react-icons/fa"; // React Icons

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      email: formData.email,
      password: formData.password,
    };

    try {
      setLoading(true);
      setErrMsg(null);

      const response = await fetch(
        "https://connectify-backend-2uq0.onrender.com/api/v1/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();
      console.log("data", data);

      if (
        data.statusCode === 200 &&
        data.data.accessToken &&
        data.data.refreshToken
      ) {
        Cookies.set("accessToken", data.data.accessToken, { expires: 1 });
        Cookies.set("refreshToken", data.data.refreshToken, { expires: 7 });
        Cookies.set("MyOwnerId", data.data.user._id, { expires: 7 });
        Cookies.set("avatar", data.data.user.avatar, { expires: 7 });

        navigate("/home");
      } else {
        setErrMsg("Invalid Username or Password");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrMsg("Invalid Username or Password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 p-6">
      {/* Branding */}
      <h1 className="absolute top-6 left-6 text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-wide drop-shadow-md">
        Connectify
      </h1>

      {/* Card */}
      <section className="p-8 w-full max-w-md bg-white/40 backdrop-blur-md shadow-xl rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center gap-2">
          <FaSignInAlt className="w-6 h-6 text-primaryColor" />
          Sign In
        </h2>

        {/* Error Message */}
        {errMsg && (
          <div className="bg-red-100 text-red-700 px-3 py-2 mb-4 rounded-md text-center font-medium">
            {errMsg}
          </div>
        )}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-800"
          />
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-800"
          />

          <button
            type="submit"
            className="w-full py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-primaryColor hover:to-purple-600 transition duration-200 flex justify-center items-center gap-2"
          >
            {loading ? <ClipLoader size={18} color="white" /> : "Sign In"}
          </button>
        </form>
      </section>

      {/* Switch to Signup */}
      <p className="mt-6 text-center text-gray-700">
        New to Connectify?{" "}
        <NavLink
          to="/signup"
          className="text-primaryColor font-semibold hover:underline"
        >
          Sign Up
        </NavLink>
      </p>
    </main>
  );
};

export default LoginPage;
