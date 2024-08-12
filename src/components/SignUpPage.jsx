import React, { useState } from "react";
import "./LoginPage.css";
import { NavLink, useNavigate } from "react-router-dom";

const SignUpPage = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    username: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      name: formData.name,
      email: formData.email,
      username: formData.username,
      password: formData.password
    };

    // console.log(requestBody);

    fetch('https://vivacious-stillness-production.up.railway.app/v1/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log('Response data:', data);
      if (data.user && data.token) {
        setMessage('Registration successfully Done!');
      } else {
        setMessage('Registration failed: Unexpected response format');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setMessage('Registration failed: ' + error.message);
    });
  };

  return (
    <>
      <main className="login-header w-full">
        <nav className="p-6 font-bold text-4xl text-start text-gray-200">
          <h1>Connectify</h1>
        </nav>
        <div className="login-container">
          <h2 className="my-6 text-3xl font-semibold text-gray-300 sm:text-black">Sign Up</h2>
          {message && <div className="text-green-600 text-xl font-bold">{message}</div>} {/* Display message */}
          <form onSubmit={handleSubmit}>
            <div className="input-field mt-4 w-full h-14 bg-white rounded-sm relative overflow-hidden">
              <input 
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required 
              />
              <label htmlFor="email">Email </label>
            </div>
            <div className="input-field mt-4 w-full h-14 bg-white rounded-sm relative overflow-hidden">
              <input 
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required 
              />
              <label htmlFor="name">Full name</label>
            </div>
            <div className="input-field mt-4 w-full h-14 bg-white rounded-sm relative overflow-hidden">
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required 
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="input-field mt-4 w-full h-14 bg-white rounded-sm relative">
              <input 
                id="password"
                type="password" 
                value={formData.password}
                onChange={handleChange}
                required 
              />
              <label htmlFor="password">Password</label>
            </div>
            <input type="submit" value="Sign Up" className="hover:cursor-pointer"/>
            <div className="remember">
              <div className="checkbox">
                <input type="checkbox" defaultChecked className="cursor-pointer" />
                <label htmlFor="checkbox"> Remember me</label>
              </div>
              <span>Need help?</span>
            </div>
          </form>
          <p>
            Already have an account? <NavLink to="/login" >Sign In.</NavLink>
          </p>
        </div>
      </main>
    </>
  );
};

export default SignUpPage;