// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Home from "./components/home/Home.jsx";
import LoginPage from "./components/LoginPage.jsx";
import SignUpPage from "./components/SignUpPage.jsx";
import AccountInformation from "./components/settings/AccountInformation.jsx";
import DefaultSettings from "./components/settings/DefaultSettings.jsx";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/home" element={isAuthenticated ? <Home /> : <LoginPage />} />
      <Route path="account-info" element={<AccountInformation />} />
      <Route path="default-settings" element={isAuthenticated ? <DefaultSettings /> : <LoginPage />} />
      {/* <Route path="account-info" element={isAuthenticated ? <AccountInformation /> : <Navigate to="/login" />} /> */}
      <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
    </Routes>
  );
}

export default App;
