import React, { useRef, useState } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import Cookies from "js-cookie";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [images, setImages] = useState([]); // Array to hold multiple images
  const [loading, setLoading] = useState(false);
  const imageRef = useRef();

  // Handle image selection
  const onImageChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array
    const validFiles = files.filter((file) => file.size <= 5 * 1024 * 1024); // 5MB limit

    if (validFiles.length < files.length) {
      alert("Some files exceed the size limit of 5MB and were not added.");
    }

    const imagePreviews = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages([...images, ...imagePreviews]); // Add new files to the existing array
  };

  // Remove a specific image
  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  // Submit the post
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!images.length) {
      alert("Please add at least one image!");
      return;
    }
    if (!caption.trim()) {
      alert("Please add a caption!");
      return;
    }
  
    const formData = new FormData();
    formData.append("description", caption);
  
    // Prepare an array to store the files
    const postMediaArray = [];
    images.forEach((image) => {
      postMediaArray.push(image.file); // Add the File object to the array
    });
  
    // Append the array of files under the key `postMedia`
    formData.append("postMedia", JSON.stringify(postMediaArray));
  
    try {
      setLoading(true);
  
      const accessToken = Cookies.get("accessToken");
  
      const response = await fetch(
        "https://connectify-backend-2uq0.onrender.com/api/v1/posts/create-post",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
    } catch (error) {
      console.error("Error sharing post:", error);
      alert("Failed to share the post. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="m-2 max-w-full bg-red-50 shadow-lg p-4 rounded-lg">
      <form onSubmit={handleSubmit}>
        {/* Caption Input */}
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write your post here..."
          className="w-full h-20 p-2 border rounded-lg mb-4 focus:outline-blue-500"
        />

        {/* Image Previews */}
        <div className="flex flex-wrap gap-4 mb-1">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image.preview}
                alt={`preview-${index}`}
                className="w-32 h-32 object-cover border rounded-lg"
              />
              <RxCross2
                className="absolute top-1 right-1 text-2xl text-red-500 bg-gray-200 rounded-full cursor-pointer"
                onClick={() => removeImage(index)}
              />
            </div>
          ))}
        </div>

        {/* Add Photo / Video */}
        <div
          onClick={() => imageRef.current.click()}
          className="mb-2 p-1 w-fit flex items-center border border-dashed border-gray-300 rounded-md cursor-pointer bg-gray-"
        >
          <MdOutlineAddPhotoAlternate className="text-2xl text-green-500 mr-2" />
          <span>Add Photo / Video</span>
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          ref={imageRef}
          onChange={onImageChange}
          className="hidden"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 rounded-lg text-white ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Sharing..." : "Share Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
