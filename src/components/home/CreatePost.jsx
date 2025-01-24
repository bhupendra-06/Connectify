import React, { useState, useRef } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { FaCircleUser } from "react-icons/fa6";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { ClipLoader } from "react-spinners";
import Cookies from "js-cookie";

const CreatePost = ({ onPostAdded }) => {
  const [images, setImages] = useState([]); // Array of images
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const imageRef = useRef();

  const onImageChange = (e) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);

      const validFiles = selectedFiles.filter((file) => {
        if (file.size > 10 * 1024 * 1024) {
          alert(`${file.name} exceeds the 5MB size limit!`);
          return false;
        }
        return true;
      });

      const newImages = validFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const onTextChange = (e) => {
    setCaption(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0 || !caption) {
      alert("Please add at least one image and a caption before sharing!");
      return;
    }

    const formData = new FormData();
    formData.append("description", caption);
    images.forEach((img) => formData.append("postMedia", img.file));

    try {
      setLoading(true);

      const accessToken = Cookies.get("accessToken");

      const response = await fetch(
        "https://connectify-backend-2uq0.onrender.com/api/v1/posts/create-post",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`, // Correct format
          },
          body: formData, // FormData will handle the request payload
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Failed to create post: ${errorData.message || "Server error"}`);
        return;
      }

      const data = await response.json();
      alert("Post created successfully!");
      setCaption("");
      setImages([]);
      if (onPostAdded) {
        onPostAdded();
      }
    } catch (error) {
      console.error("Error sharing post:", error);
      alert("Failed to share the post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const avatar = Cookies.get("avatar");

  return (
    <form
      className="mx-2 my-2 p-4 border shadow-lg shadow-gray-200 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center">
        <div className="w-10 h-10 text-xl font-bold bg-[#eee] grid place-items-center rounded-full">
          <HiOutlinePencilAlt className="text-2xl text-primaryColor" />
        </div>
        <h4 className="mx-2 text-sm text-gray-400 font-bold">Create Post</h4>
      </div>
      <div className="caption relative my-3 h-20 rounded-lg border-2 border-gray-300 overflow-hidden">
        <figure className="absolute top-0 left-0">
          {avatar ? (
            <img
              src={avatar}
              className="icon mx-2 w-6 h-6 object-cover rounded-full border border-blue-200 shadow-sm"
            />
          ) : (
            <FaCircleUser className="icon text-gray-400 text-2xl" />
          )}
        </figure>
        <textarea
          id="post-caption"
          placeholder="Type here..."
          className="resize-none pl-9 pt-1 w-full h-full rounded-lg p-2 outline-none"
          aria-label="Post caption"
          maxLength={500}
          value={caption}
          onChange={onTextChange}
        ></textarea>
      </div>
      {/* PREVIEW UPLOADED IMAGES */}
      <div className="previewImages grid grid-cols-2 gap-2">
        {images.map((img, index) => (
          <div key={index} className="relative">
            <img src={img.preview} alt={`preview-${index}`} className="w-56" />
            <RxCross2
              className="absolute top-0 right-0 p-0.5 rounded-full bg-gray-300 text-gray-600 text-2xl cursor-pointer"
              onClick={() => removeImage(index)}
            />
          </div>
        ))}
      </div>
      <div className="mx-auto flex items-center justify-between mt-1">
        <div
          onClick={() => {
            imageRef.current.click();
          }}
          className="w-full h-full flex items-center justify-start cursor-pointer select-none"
        >
          <MdOutlineAddPhotoAlternate className="mx-1 text-xl text-green-500" />
          <span>Photo / Video</span>
        </div>
        <input
          id="file"
          type="file"
          accept="image/*"
          ref={imageRef}
          onChange={onImageChange}
          multiple
          className="hidden"
        />
        <button
          type="submit"
          className="px-3 py-0.5 rounded-sm border-2 border-primaryColor bg-primaryColor text-white text-base font-bold hover:scale-105 duration-200"
        >
          {loading ? (
            <ClipLoader size={15} color="white" className="mx-2" />
          ) : (
            "Share"
          )}
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
