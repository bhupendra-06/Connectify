import React from "react";
import { useState, useRef } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Cookies from "js-cookie";

const CreateStoryForm = ({ onStoryAdded }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // For form modal

  const imageRef = useRef(null);

  const handleButtonClick = () => {
    setOpen(true);
    setTimeout(() => {
      imageRef.current.click();
    }, 1); // Small delay to ensure the click event has time to trigger
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image!");
      return;
    }

    const formData = new FormData();
    formData.append("description", caption);
    formData.append("postMedia", image);

    try {
      setLoading(true);

      const accessToken = Cookies.get("accessToken"); //Authentication token

      const response = await fetch(
        "https://connectify-backend-2uq0.onrender.com/api/v1/story/post-story",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Failed to create story: ${errorData.message || "Server error"}`);
        return;
      }

      const data = await response.json();
      setOpen(false);
      setCaption("");
      setImage(null);

      if (onStoryAdded) {
        onStoryAdded();
      }
    } catch (error) {
      console.error("Error sharing story:", error);
      alert("Failed to share the story. Please try again.");
    } finally {
      setLoading(false);
    }
  };
 

  return (
    <>
      {/* FORM MODAL TO POST STROY  */}
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop transition className="fixed inset-0 bg-gray-600/90" />
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="mx-auto flex min-h-full items-center justify-center text-center sm:items-center">
            {/* Here is the Dialog Panel  */}
            <DialogPanel>
              <div className="mx-auto p-4 w-screen sm:max-w-lg h-screen sm:h-auto bg-blue-100/5 sm:bg-blue-100  shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-2 hidden sm:block">
                  Preview Story
                </h2>

                {/*Story Preview Screen*/}
                {image && (
                  <div className="mb-6 flex justify-center">
                    <div className="w-[180px] h-[360px] sm:w-[234px] sm:h-[468px] border-4 border-gray-400 rounded-2xl relative bg-gray-200 overflow-hidden">
                      <div className=""></div>
                      <div className="absolute w-full h-full bg-black flex items-center justify-center">
                        <img
                          src={URL.createObjectURL(image)}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      ref={imageRef}
                      onChange={handleImageChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none hidden"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="caption"
                      className="hidden sm:block text-gray-700 font-medium mb-2"
                    >
                      Caption:
                    </label>
                    <textarea
                      id="caption"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="Write a caption..."
                      rows="3"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full text-white font-medium py-2 px-4 rounded-lg ${
                      loading
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    } focus:outline-none`}
                  >
                    {loading ? "Posting..." : "Post Story"}
                  </button>
                </form>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <button
        type="button"
        onClick={handleButtonClick}
        className="mx-auto text-center inline-flex w-auto justify-center rounded-full bg-blue-600 px-3 py-1 text-2xl font-medium text-white focus:outline-none"
      >
        +
      </button>
    </>
  );
};
export default CreateStoryForm;
