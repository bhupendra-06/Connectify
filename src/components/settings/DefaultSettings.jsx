import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { BiUserCircle, BiBell, BiLockAlt, BiLink } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { TbLogout } from "react-icons/tb";
import { PiCaretRightThin } from "react-icons/pi";
import Cookies from "js-cookie";

function DefaultSettings() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = async () => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) return;

    try {
      const response = await fetch(
        "https://connectify-backend-2uq0.onrender.com/api/v1/users/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const settingsList = [
    { label: "Profile Information", icon: <BiUserCircle size={22} />, action: () => navigate("/account-info") },
    { label: "Notifications", icon: <BiBell size={22} />, action: () => navigate("/notifications") },
    { label: "Linked Accounts", icon: <BiLink size={22} />, action: () => navigate("/linked-accounts") },
    { label: "Security & Password", icon: <BiLockAlt size={22} />, action: () => navigate("/change-password") },
    { label: "Preferences", icon: <FiSettings size={22} />, action: () => navigate("/preferences") },
    { label: "Logout", icon: <TbLogout size={22} />, action: () => setShowLogoutModal(true) },
  ];

  return (
    <div className="max-w-md mx-3 sm:mx-auto bg-[#f9fafe] rounded-xl shadow-lg mt-5 sm:mt-10 select-none">
      {/* Header */}
      <div className="flex items-center p-5 border-b">
        <Link onClick={() => navigate(-1)}>
          <GoArrowLeft size={28} className="hover:text-gray-500 transition" />
        </Link>
        <h1 className="pl-4 text-xl sm:text-2xl font-bold text-gray-800">Settings</h1>
      </div>

      {/* Settings List */}
      <div className="flex flex-col p-3">
        {settingsList.map((item, index) => (
          <div
            key={index}
            onClick={item.action}
            className="flex items-center justify-between p-4 mb-3 rounded-xl shadow hover:shadow-md transition cursor-pointer bg-white"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primaryColor/25 text-primaryColor flex items-center justify-center shadow-md">
                {item.icon}
              </div>
              <span className="font-semibold text-gray-800">{item.label}</span>
            </div>
            <PiCaretRightThin size={22} className="text-gray-400" />
          </div>
        ))}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h2 className="text-lg font-bold text-center mb-4">Confirm Logout</h2>
            <p className="text-center text-gray-600 mb-6">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="bg-primaryColor text-white px-4 py-2 rounded font-semibold hover:bg-primaryColor/80"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded font-semibold hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DefaultSettings;
