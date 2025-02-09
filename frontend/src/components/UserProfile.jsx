import React, { useState, useEffect } from "react";
import axios from "axios";
import '../components/css/UserProfile.css';
import Navbar from "./Navbar";
import { toast, ToastContainer } from 'react-toastify';  // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // Import the styles

const UserProfile = () => {
  const [image, setImage] = useState(null);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    gradeLevel: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState('path/to/default-avatar.png'); // Default profile picture
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newProfilePicture, setNewProfilePicture] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("auth-token");
      console.log("Token retrieved from localStorage:", token); // Debugging line

      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await axios.post('http://localhost:4000/api/auth/user', { token });
        console.log("User Data:", response.data);  // Debugging line
        setUser(response.data.user);
        setProfilePictureUrl(response.data.user.profilePicture?.url || 'path/to/default-avatar.png'); // Default if no image
      } catch (err) {
        console.error("Error fetching user:", err.response?.data || err);
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Preview image
        setNewProfilePicture(file); // Update new profile picture to be sent
      };
      reader.readAsDataURL(file); // Convert file to base64
    }
  };
  

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleUsernameChange = (e) => setNewUsername(e.target.value);
  const handleEmailChange = (e) => setNewEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("auth-token");
    if (!token) {
      console.error("No token found");
      return;
    }
  
    toast.info("Updating profile..."); // Show loading toast
  
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('gradeLevel', user.gradeLevel);
    if (newProfilePicture) {
      formData.append('profilePicture', newProfilePicture);
    }
  
    try {
      const response = await axios.put(
        `http://localhost:4000/api/auth/update-profile/${user._id}`,
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );
  
      console.log("Profile updated successfully:", response.data);
      setUser(response.data.user);
      setProfilePictureUrl(`${response.data.user.profilePicture?.url}?t=${Date.now()}`);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      toast.error('Error updating profile');
    }
  };
  
  
  


  if (error || !user) return <div><Navbar /><div className="no-user"><p>{error || 'No user information available.'}</p></div></div>;

  return (
    <>
      <Navbar />
      <div className="user-container">
        <div className="user-content">
          <div className="user-card">
            <div className="header">
              {/* Optional header if you need */}
            </div>

            <h1 className="user-heading">USER PROFILE</h1>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">NAME</label>
                <input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  className="form-input"
                  value={user.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">EMAIL</label>
                <input
                  type="email"
                  id="email"
                  placeholder="hello@reallygreatsite.com"
                  className="form-input"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">PASSWORD</label>
                <input
                  type="password"
                  id="password"
                  placeholder="********"
                  className="form-input"
                  value={user.password}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="gradeLevel">CURRENT YEAR / GRADE LEVEL</label>
                <input
                  type="text"
                  id="gradeLevel"
                  placeholder="Grade 12"
                  className="form-input"
                  value={user.gradeLevel}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="user-button">
                Update
              </button>
            </form>
          </div>

          {/* Image upload section outside user card */}
          <div className="image-upload-container">
            <div className="form-group image-upload">
              <label htmlFor="profile-image">Profile Picture</label>
              <div className="image-preview-container">
                {image ? (
                  <img src={image} alt="Profile Preview" className="image-preview" />
                ) : (
                  <img src={profilePictureUrl} alt="Profile Picture" className="image-preview" />
                )}
              </div>
              <input
                type="file"
                id="profile-image"
                onChange={handleImageChange}
                className="form-input"
                accept="image/*"
              />
            </div>
          </div>

          {/* Optional error message */}
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>

      {/* Add ToastContainer here to display the toasts */}
      <ToastContainer />
    </>
  );
};

export default UserProfile;
