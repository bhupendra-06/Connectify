import React from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { FaCircleUser } from "react-icons/fa6";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useState, useRef } from "react";
import { ClipLoader } from "react-spinners";

const CreatePost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState(null);
  const [loading, setLoading] = useState(false);
  const imageRef = useRef();

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      if (img.size > 5 * 1024 * 1024) {
        // 5MB limit
        alert("File size should be less than 5MB!");
        return;
      }
      setImage({
        file: img, // Store the actual file
        preview: URL.createObjectURL(img), // Preview URL
      });
    }
  };

  const onTextChange = (e) => {
    setCaption(e.target.value);
  };

  // ON SUBMISSION
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Ensures image or caption is provided
    if (!image || !caption) {
      alert("Please add an Image or a Text before sharing!");
      return;
    }
    //Creating FormData Object to store inputs
    const formData = new FormData();
    formData.append("description", caption);
    formData.append("postMedia", image.file);
    
    try {
      setLoading(true); //shows loader
      const token = localStorage.getItem("token");

      // Make API call
      const response = await fetch(
        "https://connectify-backend-2uq0.onrender.com/api/v1/posts/create-post",
        {
          method: "POST",
          headers: {
            Authorization: `{token}`,
          },
          body: formData,
        }
      );

      // Parse the response
      const data = await response.json();

      // Handle response
      if (response.ok) {
        alert("Post created successfully!");
        setCaption(""); // Reset caption
        setImage(null); // Reset image
      } else {
        alert(`Failed to create post: ${data.message}`);
      }
    } catch (error) {
      console.error("Error sharing post:", error);
      alert("Failed to share the post. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      className="mx-2 my-5 p-5 border shadow-lg shadow-gray-200 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center">
        <div className="w-10 h-10 text-xl font-bold bg-[#eee] grid place-items-center rounded-full">
          <HiOutlinePencilAlt className="text-2xl text-blue-600" />
        </div>
        <h4 className="mx-2 text-sm text-gray-400 font-bold">Create Post</h4>
      </div>
      <div className="caption relative my-5 h-20 rounded-lg border-2 border-gray-300 overflow-hidden">
        <figure className="absolute top-0 left-0">
          <FaCircleUser className="icon text-yellow-500" />
        </figure>
        <textarea
          placeholder="Type here..."
          className="pl-12 pt-3 w-full h-full rounded-lg p-2 outline-none"
          aria-label="Post caption"
          maxLength={500}
          value={caption}
          onChange={onTextChange}
        ></textarea>
      </div>
      {/* PREVIEW UPLOADED IMAGE */}
      {image && (
        <div className="previewImage w-full flex justify-start items-start">
          <img src={image.preview} alt="preview" className="w-56" />
          <RxCross2
            className="mx-2 p-0.5 rounded-full bg-gray-300 text-gray-600 text-2xl cursor-pointer"
            onClick={() => setImage(null)}
          />
        </div>
      )}
      <div className="mx-auto flex items-center justify-between">
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
          className="hidden"
        />
        <button
          type="submit"
          className="px-3 py-0.5 rounded-sm border-2 border-blue-500 bg-blue-500 text-white text-base font-bold hover:scale-105 duration-200"
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
