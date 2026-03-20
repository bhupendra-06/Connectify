import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { FaUserPlus } from "react-icons/fa"; // React Icons instead of Lucide

const SignUpPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [msgColor, setMsgColor] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      fullName: formData.fullName,
      email: formData.email,
      username: formData.username,
      password: formData.password,
    };

    setLoading(true);
    setMessage(null);
    fetch("https://connectify-backend-2uq0.onrender.com/api/v1/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setMessage("Registration successful!");
          setMsgColor("bg-green-100 text-green-700");
          navigate("/login");
        } else {
          setMessage("Registration failed. Try again.");
          setMsgColor("bg-red-100 text-red-700");
        }
        setLoading(false);
      })
      .catch((error) => {
        setMessage("Error: " + error.message);
        setMsgColor("bg-red-100 text-red-700");
        setLoading(false);
        setFormData({
          email: "",
          fullName: "",
          username: "",
          password: "",
        });
      });
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
          <FaUserPlus className="w-6 h-6 text-primaryColor" />
          Create Account
        </h2>

        {/* Message */}
        {message && (
          <div
            className={`${msgColor} px-3 py-2 mb-4 rounded-md text-center font-medium`}
          >
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-800"
          />
          <input
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-800"
          />
          <input
            id="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-800"
          />
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-800"
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-primaryColor hover:to-purple-600 transition duration-200 flex justify-center items-center gap-2"
          >
            {loading ? <ClipLoader size={18} color="white" /> : "Sign Up"}
          </button>
        </form>
      </section>

      {/* Switch to login */}
      <p className="mt-6 text-center text-gray-700">
        Already have an account?{" "}
        <NavLink
          to="/login"
          className="text-primaryColor font-semibold hover:underline"
        >
          Sign In
        </NavLink>
      </p>
    </main>
  );
};

export default SignUpPage;
