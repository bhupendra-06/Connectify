import React, { useState } from "react";
import "./LoginPage.css";
import { NavLink, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import Cookies from "js-cookie";
import { ClipLoader } from "react-spinners";

// const TestPage = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     fullName: "",
//     username: "",
//     password: "",
//   });

//   const [message, setMessage] = useState("");
//   const [msgColor, setMsgColor] = useState("");

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [id]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const requestBody = {
//       fullName: formData.fullName,
//       email: formData.email,
//       username: formData.username,
//       password: formData.password,
//     };
//     console.log("requestBody", requestBody);

//     fetch(
//       "https://connectify-backend-2uq0.onrender.com/api/v1/users/register",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(requestBody),
//       }
//     )
//       .then((response) => {
//         if (!response) {
//           throw new Error("Network response was not ok " + response.statusText);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log("Response data:", data);
//         if (data) {
//           setMessage("Registration successfully Done!");
//           setMsgColor("text-green-600");
//           alert("Registration successfully Done!");
//           navigate("/login");
//         } else {
//           setMessage("Registration failed: Unexpected response format");
//           setMsgColor("text-red-600");
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         setMessage("Registration failed: " + error.message);
//         setMsgColor("text-red-600");
//       });
//   };

//   return (
//     <main className="min-h-screen flex items-center justify-center bg-gray-100">
//       <section className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
//         <h2
//           className="text-3xl font-bold text-center mb-8"
//           style={{ color: "var(--primaryColor)" }}
//         >
//           Create Account
//         </h2>
//         {message && (
//           <div className={`${msgColor} mb-2 text-lg font-medium`}>
//             User already exists.
//           </div>
//         )}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="relative z-0 w-full group">
//             <input
//               type="email"
//               name="email"
//               id="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primaryColor peer"
//               placeholder=" "
//               required
//             />
//             <label
//               htmlFor="email"
//               className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-100 top-2 origin-0 left-0 peer-focus:left-0 peer-focus:text-primaryColor peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
//             >
//               Email
//             </label>
//           </div>
//           <div className="relative z-0 w-full group">
//             <input
//               type="text"
//               name="username"
//               id="username"
//               value={formData.username}
//               onChange={handleChange}
//               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primaryColor peer"
//               placeholder=" "
//               required
//             />
//             <label
//               htmlFor="username"
//               className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-100 top-2 origin-0 left-0 peer-focus:left-0 peer-focus:text-primaryColor peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
//             >
//               Username
//             </label>
//           </div>
//           <div className="relative z-0 w-full group">
//             <input
//               type="text"
//               name="fullname"
//               id="fullname"
//               value={formData.fullname}
//               onChange={handleChange}
//               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primaryColor peer"
//               placeholder=" "
//               required
//             />
//             <label
//               htmlFor="fullname"
//               className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-100 top-2 origin-0 left-0 peer-focus:left-0 peer-focus:text-primaryColor peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
//             >
//               Full Name
//             </label>
//           </div>
//           <div className="relative z-0 w-full group">
//             <input
//               type="password"
//               name="password"
//               id="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primaryColor peer"
//               placeholder=" "
//               required
//             />
//             <label
//               htmlFor="password"
//               className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-100 top-2 origin-0 left-0 peer-focus:left-0 peer-focus:text-primaryColor peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
//             >
//               Create Password
//             </label>
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-primaryColor text-white py-2 rounded hover:bg-opacity-90 transition duration-200"
//           >
//             Sign Up
//           </button>
//         </form>
//         <p className="mt-6 text-center text-gray-600">
//           Already have an account?{" "}
//           <NavLink
//             to="/login"
//             className="text-primaryColor font-bold hover:underline"
//           >
//             Sign In.
//           </NavLink>
//         </p>
//       </section>
//     </main>
//   );
// };

const TestPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      email: formData.email,
      password: formData.password,
    };

    try {
      setLoading(true);
      setErrMsg(null);
      const response = await fetch(
        "https://connectify-backend-2uq0.onrender.com/api/v1/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();
      console.log("data", data);
      // console.log("MyUserID :",data.data.user._id);

      if (
        data.statusCode === 200 &&
        data.data.accessToken &&
        data.data.refreshToken
      ) {
        Cookies.set("accessToken", data.data.accessToken, { expires: 1 }); // Expires in 1 day
        Cookies.set("refreshToken", data.data.refreshToken, { expires: 7 }); // Expires in 7 days
        Cookies.set("MyOwnerId", data.data.user._id, { expires: 7 }); // Owner Id for use
        Cookies.set("avatar", data.data.user.avatar, { expires: 7 });

        navigate("/home");
      } else {
        setErrMsg("Invalid Username or Password");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrMsg("Invalid Username or Password. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <section className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2
          className="text-3xl font-bold text-center mb-8 text-primaryColor"
        >
          Sign In
        </h2>
        {errMsg && <div className="mb-2 text-red-600">{errMsg}</div>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative z-0 w-full group">
            <input
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primaryColor peer"
              placeholder=" "
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-100 top-2 origin-0 left-0 peer-focus:left-0 peer-focus:text-primaryColor peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
            >
              Email
            </label>
          </div>
          <div className="relative z-0 w-full group">
            <input
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primaryColor peer"
              placeholder=" "
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-100 top-2 origin-0 left-0 peer-focus:left-0 peer-focus:text-primaryColor peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
            >
              Password
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-primaryColor text-white py-2 rounded hover:bg-opacity-90 transition duration-200"
          >
            {loading ? (
              <ClipLoader size={16} color="white" className="mx-2" />
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          New to Connectify?{" "}
          <NavLink
            to="/signup"
            className="text-primaryColor font-bold hover:underline"
          >
            Sign up Now.
          </NavLink>
        </p>
      </section>
    </main>
  );
};

export default TestPage;
