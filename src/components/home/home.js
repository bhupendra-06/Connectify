// import React, { useState } from 'react';

// const SignUpForm = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     name: '',
//     username: '',
//     password: ''
//   });

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [id]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     const requestBody = {
//       email: formData.email,
//       name: formData.name,
//       username: formData.username,
//       password: formData.password
//     };

//     console.log(requestBody);

//     // You can now send requestBody to your server using fetch or another method
//     // Example with fetch:
    // fetch('your-server-endpoint', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(requestBody)
    // })
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch(error => console.error('Error:', error));
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="input-field mt-4 w-full h-14 bg-white rounded-sm relative overflow-hidden">
//         <input type="text" id="email" value={formData.email} onChange={handleChange} required />
//         <label htmlFor="email">Email or phone number</label>
//       </div>
//       <div className="input-field mt-4 w-full h-14 bg-white rounded-sm relative overflow-hidden">
//         <input type="text" id="name" value={formData.name} onChange={handleChange} required />
//         <label htmlFor="name">Full name</label>
//       </div>
//       <div className="input-field mt-4 w-full h-14 bg-white rounded-sm relative overflow-hidden">
//         <input type="text" id="username" value={formData.username} onChange={handleChange} required />
//         <label htmlFor="username">Username</label>
//       </div>
//       <div className="input-field mt-4 w-full h-14 bg-white rounded-sm relative">
//         <input type="password" id="password" value={formData.password} onChange={handleChange} required />
//         <label htmlFor="password">Password</label>
//       </div>
//       <input type="submit" value="Sign Up" />
//     </form>
//   );
// };

// export default SignUpForm;





// const requestBody = {
//     // Add your request body properties here
//     username: 'exampleUser',
//     password: 'examplePassword'
//   };
  
//   fetch('https://vivacious-stillness-production.up.railway.app/v1/users/register', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(requestBody)
//   })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok ' + response.statusText);
//       }
//       return response.json();
//     })
//     .then(data => {
//       console.log('Response data:', data); // Log the entire response data
//       if (data.user && data.token) {
//         console.log('Registration successful:', data);
//       } else {
//         console.log('Registration failed: Unexpected response format');
//       }
//     })
//     .catch(error => console.error('Error:', error));
