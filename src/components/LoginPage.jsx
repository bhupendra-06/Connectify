import React from "react";
import { useState } from "react";
import "./LoginPage.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      email: formData.email,
      password: formData.password
    };

    console.log(requestBody);

    fetch('https://vivacious-stillness-production.up.railway.app/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

  }

  return (
    <>
      <main className="login-header w-full">
        <nav className="p-6 font-bold text-4xl text-start text-gray-200">
          <h1>Connectify</h1>
        </nav>
        {/* SIGN IN CONTAINER */}
        <div className="login-container">
          <nav className="mx-auto w-40">
            <img src="https://connectify.me/wp-content/uploads/HOTSPOT-2021-01.png" alt="logo" className="logo" />
          </nav>
          <h2 className="my-6 text-3xl font-semibold text-gray-300 sm:text-black">Sign In</h2>
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
                <input type="checkbox" defaultChecked  className="cursor-pointer" />
                <label htmlFor="checkbox"> Remember me</label>
              </div>
              <span>Need help?</span>
            </div>
          </form>
          <p>
            New to Connectify? <a href="index.html">Sign up now.</a>
          </p>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
