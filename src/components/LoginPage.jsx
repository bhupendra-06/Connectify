import React from "react";
import "./LoginPage.css";

const LoginPage = () => {
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
          <form action="">
            <div className="input-field mt-4 w-full h-14 bg-white rounded-sm relative overflow-hidden">
              <input type="text" required />
              <label for="email">Email or phone number</label>
            </div>
            <div className="input-field mt-4 w-full h-14 bg-white rounded-sm relative">
              <input type="password" required />
              <label for="password">Password</label>
            </div>
            <input type="submit" value="Sign In" />
            <div className="remember">
              <div className="chechbox">
                <input type="checkbox" checked />
                <label for="chechbox">Remember me</label>
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
