// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Home from "./components/home/Home.jsx";
import LoginPage from "./components/LoginPage.jsx";
import SignUpPage from "./components/SignUpPage.jsx";
import AccountInformation from "./components/settings/AccountInformation.jsx";
import DefaultSettings from "./components/settings/DefaultSettings.jsx";
import UserProfile from "./components/home/UserProfile.jsx";
import SearchUser from "./components/search/SearchUser.jsx";
import TestPage from "./components/TestPage.jsx";

const App = () => {
  const navigate = useNavigate();
  const isAuthenticated = () => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");
    return accessToken && refreshToken;
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated() ? <Navigate to="/home" /> : <LoginPage />}
      />
      <Route path="/signup" element={<SignUpPage />} />
      <Route
        path="/profile/:id"
        element={isAuthenticated() ? <UserProfile /> : <Navigate to="/login" />}
      />
      <Route path="/test" element={<TestPage />} />

      {/* Protected Routes */}
      <Route
        path="/home"
        element={isAuthenticated() ? <Home /> : <Navigate to="/login" />}
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
      <Route
        path="/search"
        element={isAuthenticated() ? <SearchUser /> : <Navigate to="/login" />}
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
