import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";

function AccountInformation() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
    about: "",
    skills: "",
    avatar: null,
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setProfile({ ...profile, [name]: files[0] });
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission logic
    console.log(profile);
    alert("Profile saved!");
  };

  return (
    <div className="mx-2 md:mx-auto max-w-[800px] bg-[#f9fafe] rounded-md my-4 shadow-md">
      {/* Header */}
      <div className="bg-primaryColor rounded-t-md">
        <div className="flex items-center p-5 text-white">
          <Link onClick={() => navigate(-1)}>
            <GoArrowLeft className="inline-block" size={28} />
          </Link>
          <h1 className="pl-4 text-xl sm:text-2xl font-bold">Profile Information</h1>
        </div>
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center mt-4 sm:mt-8">
        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-gray-200">
          {profile.avatar ? (
            <img
              src={URL.createObjectURL(profile.avatar)}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <IoCloudUploadOutline size={40} />
            </div>
          )}
        </div>
        <label className="mt-2 text-sm font-semibold cursor-pointer text-primaryColor">
          Upload Avatar
          <input
            type="file"
            name="avatar"
            onChange={handleChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6">
        {/* Personal Info */}
        <h2 className="text-lg font-semibold mb-2">Personal Info</h2>
        <div className="grid gap-4 sm:grid-cols-2 mb-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={profile.fullName}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-primaryColor"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={profile.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-primaryColor"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={profile.phone}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-primaryColor"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={profile.location}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-primaryColor"
          />
        </div>

        {/* Social Links */}
        <h2 className="text-lg font-semibold mb-2">Social Links</h2>
        <div className="grid gap-4 sm:grid-cols-2 mb-4">
          <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2">
            <FaLinkedin size={20} className="text-blue-700" />
            <input
              type="text"
              name="linkedin"
              placeholder="LinkedIn URL"
              value={profile.linkedin}
              onChange={handleChange}
              className="w-full focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2">
            <FaGithub size={20} className="text-black" />
            <input
              type="text"
              name="github"
              placeholder="GitHub URL"
              value={profile.github}
              onChange={handleChange}
              className="w-full focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2">
            <FaGlobe size={20} className="text-green-600" />
            <input
              type="text"
              name="portfolio"
              placeholder="Portfolio URL"
              value={profile.portfolio}
              onChange={handleChange}
              className="w-full focus:outline-none"
            />
          </div>
        </div>

        {/* About Me */}
        <h2 className="text-lg font-semibold mb-2">About Me</h2>
        <textarea
          name="about"
          placeholder="Write a short professional summary..."
          value={profile.about}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-primaryColor h-24 resize-none"
        />

        {/* Skills */}
        <h2 className="text-lg font-semibold mb-2">Skills</h2>
        <input
          type="text"
          name="skills"
          placeholder="React, JavaScript, Node.js..."
          value={profile.skills}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-primaryColor"
        />

        {/* Resume Upload */}
        <h2 className="text-lg font-semibold mb-2">Resume</h2>
        <label className="flex items-center gap-2 border border-gray-300 rounded-md p-2 cursor-pointer mb-6">
          <IoCloudUploadOutline size={28} className="text-primaryColor" />
          <span>{profile.resume ? profile.resume.name : "Upload Resume (PDF)"}</span>
          <input
            type="file"
            name="resume"
            onChange={handleChange}
            className="hidden"
          />
        </label>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full bg-primaryColor text-white font-bold py-3 rounded-md hover:opacity-90 transition"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}

export default AccountInformation;
