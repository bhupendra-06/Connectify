import React, { useState } from "react";
import "./LoginPage.css";
import { NavLink, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import Cookies from "js-cookie";
import { ClipLoader } from "react-spinners";

const TestPage = () => {
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
      // console.log("MyUserID :",data.data.user._id);

      if (
        data.statusCode === 200 &&
        data.data.accessToken &&
        data.data.refreshToken
      ) {
        Cookies.set("accessToken", data.data.accessToken, { expires: 1 }); // Expires in 1 day
        Cookies.set("refreshToken", data.data.refreshToken, { expires: 7 }); // Expires in 7 days
        Cookies.set("MyOwnerId", data.data.user._id, { expires: 7 }); // Owner Id for use
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
    <main className="p-6 min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#F1F5F9] to-[#D1D5DB]">
      <nav className="hidden sm:inline-block mb-20 font-bold text-4xl text-start text-[#3674B5]">
        <h1>Start Making Friends on Connectify</h1>
      </nav>
      <div className="w-full max-w-md flex flex-col bg-white p-8 rounded-lg shadow-lg">
        <h2 className="mb-6 text-4xl font-bold text-[#1E293B]">Sign In</h2>
        {errMsg && <div className="mb-4 text-red-400">{errMsg}</div>}
        <form className="w-full max-w-md flex flex-col" onSubmit={handleSubmit}>
          <div className="mb-6 relative w-full">
            <input
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primaryColor peer"
              placeholder=" "
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-100 top-2 origin-0 left-0 peer-focus:left-0 peer-focus:text-primaryColor peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
            >
              Email
            </label>
          </div>
          <div className="mb-10 relative w-full">
            <input
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primaryColor peer"
              placeholder=" "
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-100 top-2 origin-0 left-0 peer-focus:left-0 peer-focus:text-primaryColor peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
            >
              Password
            </label>
          </div>
          <button
            type="submit"
            className="mb-0 w-full bg-[#578E7E] text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition duration-200"
          >
            {loading ? <ClipLoader size={16} color="white" /> : "Sign In"}
          </button>
        </form>
      </div>
      <p className="my-6 text-[#1E293B]">
        New to Connectify?{" "}
        <NavLink
          to="/signup"
          className="text-[#578E7E] font-bold hover:underline"
        >
          Sign up now.
        </NavLink>
      </p>
    </main>
  );
};

export default TestPage;
