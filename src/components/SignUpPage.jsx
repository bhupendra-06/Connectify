import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

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
    console.log("requestBody", requestBody);
    setLoading(true);
    setMessage(null);
    fetch(
      "https://connectify-backend-2uq0.onrender.com/api/v1/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    )
      .then((response) => {
        if (!response) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data);
        if (data) {
          setMessage("Registration successfully Done!");
          setMsgColor("text-green-600");
          alert("Registration successfully Done!");
          navigate("/login");
        } else {
          setMessage("Registration failed: Unexpected response format");
          setMsgColor("text-red-600");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage("Registration failed: " + error.message);
        setMsgColor("text-red-600");
        setLoading(false);
        setFormData({
          email: "",
          fullName: "",
          username: "",
          password: "",
        })
      });
  };

  return (
    <main className="p-6 min-h-screen flex flex-col items-center justify-center bg-gradient-to-tl from-20% from-[#F1F5F9] to-[#064c50]">
          <h1 className="absolute top-0 left-0 p-6 text-3xl sm:text-4xl text-gray-100 font-bold shadow-lg rounded-lg w-full">Connectify</h1>
      <section className="p-8 w-full max-w-md bg-white shadow-lg rounded-lg">
        <h2
          className="text-3xl font-semibold text-center text-gray-800 mb-8"
        >
          Create Account
        </h2>
        {message && (
          <div className={`${msgColor} mb-2 text-lg font-medium`}>
            User already exists.
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative z-0 w-full group">
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              name="email"
              placeholder=" "
              required
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primaryColor peer"
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-100 top-2 origin-0 left-0 peer-focus:left-0 peer-focus:text-primaryColor peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
            >
              Email
            </label>
          </div>
          <div className="relative z-0 w-full group">
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder=" "
              required
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primaryColor peer"
            />
            <label
              htmlFor="fullname"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-100 top-2 origin-0 left-0 peer-focus:left-0 peer-focus:text-primaryColor peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
            >
              Full Name
            </label>
          </div>
          <div className="relative z-0 w-full group">
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primaryColor peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="username"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-100 top-2 origin-0 left-0 peer-focus:left-0 peer-focus:text-primaryColor peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
            >
              Username
            </label>
          </div>
          <div className="relative z-0 w-full group">
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primaryColor peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-100 top-2 origin-0 left-0 peer-focus:left-0 peer-focus:text-primaryColor peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
            >
              Create Password
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-primaryColor text-white py-2 font-semibold rounded hover:bg-opacity-90 transition duration-200"
          >
            {loading ? <ClipLoader size={16} color="white" /> : "Sign Up"}
          </button>
        </form>
      </section>
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-primaryColor font-semibold hover:underline"
          >
            Sign In.
          </NavLink>
        </p>
    </main>
  );
};

export default SignUpPage;
