// src/components/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { ClipLoader } from "react-spinners";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({ email: "", password: "" });
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
      setErrMsg("Invalid Username or Password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-header w-full">
      <nav className="p-6 font-bold text-4xl text-start text-gray-200">
        <h1>Connectify</h1>
      </nav>
      <div className="login-container">
        <nav className="mx-auto w-40">
          <img
            src="https://connectify.me/wp-content/uploads/HOTSPOT-2021-01.png"
            alt="logo"
            className="logo"
          />
        </nav>
        <h2 className="my-6 text-3xl font-semibold text-gray-300 sm:text-black">
          Sign In
        </h2>
        {errMsg && <div className="text-red-600">{errMsg}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-field mt-4 w-full h-14 bg-white rounded-sm relative overflow-hidden">
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email </label>
          </div>
          <div className="input-field mt-4 w-full h-14 bg-white rounded-sm relative">
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="mt-10 px-5 py-3 w-full text-center font-bold text-white bg-primaryColor rounded-2xl">
            {loading ? (
              <ClipLoader size={16} color="white" className="mx-2" />
            ) : (
              <button type="submit" className="hover:cursor-pointer">
                Sign In
              </button>
            )}
          </div>
          <div className="remember">
            <div className="checkbox flex gap-1 items-center">
              <input type="checkbox" className="cursor-pointer" />
              <label htmlFor="checkbox"> Remember me</label>
            </div>
            <span className="hover:text-primaryColor">Need help?</span>
          </div>
        </form>
        <p>
          New to Connectify? <NavLink to="/signup">Sign up now.</NavLink>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
