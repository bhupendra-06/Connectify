import React, { useState } from "react";
import "./LoginPage.css";
import { NavLink, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import Cookies from "js-cookie";
import { ClipLoader } from "react-spinners";

const TestPage = () => {
  const navigate = useNavigate();

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
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage("Registration failed: " + error.message);
        setMsgColor("text-red-600");
      });
  };

  return (
    <>
      <div className="p-6 text-xl text-gray-500">This is a test page that you can use to test any website.</div>
    </>
  );
};

export default TestPage;
