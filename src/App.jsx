import "./App.css";
import Home from "./components/home/Home.jsx";
import LoginPage from "./components/LoginPage.jsx";
import SignUpPage from "./components/SignUpPage.jsx";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import AccountInformation from "./components/settings/AccountInformation.jsx";
import DefaultSettings from "./components/settings/DefaultSettings.jsx";

import { Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";

function App() {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="pt-10 md:pt-20 px-0 lg:pl-64 lg:pr-20">
        <Outlet />
      </div>
    </>
  );
}

export default App;
