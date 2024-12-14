// src/components/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";


const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errMsg, setErrMsg] = useState('');

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
      const response = await fetch("https://connectify-backend-2uq0.onrender.com/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
  
      const data = await response.json();
      console.log("data",data);
      console.log("MyUserID :",data.data.user._id);
  
      if (data.statusCode === 200 && data.data.accessToken && data.data.refreshToken) {
        
        Cookies.set("accessToken", data.data.accessToken, { expires: 1 }); // Expires in 1 day
        Cookies.set("refreshToken", data.data.refreshToken, { expires: 7 }); // Expires in 7 days
  
        navigate("/home");
        
      } else {
        setErrMsg("Invalid Username or Password");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrMsg("Invalid Username or Password. Please try again.");
    }
  };

  return (
    <main className="login-header w-full">
      <nav className="p-6 font-bold text-4xl text-start text-gray-200">
        <h1>Connectify</h1>
      </nav>
      <div className="login-container">
        <nav className="mx-auto w-40">
          <img src="https://connectify.me/wp-content/uploads/HOTSPOT-2021-01.png" alt="logo" className="logo" />
        </nav>
        <h2 className="my-6 text-3xl font-semibold text-gray-300 sm:text-black">Sign In</h2>
        {errMsg && <div className="text-red-600">{errMsg}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-field mt-4 w-full h-14 bg-white rounded-sm relative overflow-hidden">
            <input type="email" id="email" value={formData.email} onChange={handleChange} required />
            <label htmlFor="email">Email </label>
          </div>
          <div className="input-field mt-4 w-full h-14 bg-white rounded-sm relative">
            <input type="password" id="password" value={formData.password} onChange={handleChange} required />
            <label htmlFor="password">Password</label>
          </div>
          <input type="submit" value="Sign In" className="hover:cursor-pointer" />
          <div className="remember">
            <div className="checkbox">
              <input type="checkbox" defaultChecked className="cursor-pointer" />
              <label htmlFor="checkbox"> Remember me</label>
            </div>
            <span>Need help?</span>
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