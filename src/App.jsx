// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Home from "./components/home/Home.jsx";
import MyProfile from "./components/home/MyProfile.jsx";
import LoginPage from "./components/LoginPage.jsx";
import SignUpPage from "./components/SignUpPage.jsx";
import AccountInformation from "./components/settings/AccountInformation.jsx";
import DefaultSettings from "./components/settings/DefaultSettings.jsx";

const App = () => {
  
  const navigate = useNavigate();
  const isAuthenticated = () => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");
    return accessToken && refreshToken;
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* Protected Routes */}
      <Route
        path="/home"
        element={isAuthenticated() ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/my-profile"
        element={isAuthenticated() ? <MyProfile /> : <Navigate to="/login" />}
      />
      <Route
        path="/account-info"
        element={
          isAuthenticated() ? <AccountInformation /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/settings"
        element={
          isAuthenticated() ? <DefaultSettings /> : <Navigate to="/login" />
        }
      />
      {/* Default Route */}
      <Route
        path="/"
        element={<Navigate to={isAuthenticated() ? "/home" : "/login"} />}
      />
    </Routes>
  );
};

export default App;
