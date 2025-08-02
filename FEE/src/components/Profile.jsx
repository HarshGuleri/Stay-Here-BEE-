import React, { useState, useEffect, useRef } from 'react';
import BookingHistory from './BookingHistory';
import { API_ENDPOINTS } from '../config/api';
import './myProfile.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  const token = localStorage.getItem('user');
  let userId = '';
  let initialName = '';
  let initialEmail = '';
  
  if (token) {
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      userId = decoded.id || decoded._id || '';
      initialName = decoded.name || '';
      initialEmail = decoded.email || '';
    } catch (error) {
      console.error('Invalid token', error);
    }
  }

  const [profile, setProfile] = useState({
    name: initialName,
    email: initialEmail,
    gender: '',
    password: '',
    profileImage: '',
  });
  const [previewImg, setPreviewImg] = useState('');
  const fileInputRef = useRef();

  // Fetch user details from backend (for gender/profileImage)
  useEffect(() => {
    if (!userId) {
      console.log('No userId available, skipping profile fetch');
      return;
    }
    
    console.log('Fetching profile for userId:', userId);
    fetch(API_ENDPOINTS.PROFILE(userId))
      .then(res => {
        console.log('Profile fetch response status:', res.status);
        return res.json();
      })
      .then(data => {
        console.log('Profile data received:', data);
        if (data.user) {
          setProfile(prev => ({
            ...prev,
            gender: data.user.gender || '',
            profileImage: data.user.profileImage || '',
            name: data.user.name || prev.name,
            email: data.user.email || prev.email,
          }));
          setPreviewImg(data.user.profileImage || '');
        }
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
      });
  }, [userId]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreviewImg(URL.createObjectURL(file));
      // For now, just store the file in state (real app: upload to server or cloud)
      setProfile({ ...profile, profileImage: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', profile.name);
    formData.append('gender', profile.gender);
    if (profile.password) formData.append('password', profile.password);
    if (profile.profileImage instanceof File) {
      formData.append('profileImage', profile.profileImage);
    }
    try {
      const res = await fetch(API_ENDPOINTS.PROFILE(userId), {
        method: 'PATCH',
        body: formData,
      });
      const data = await res.json();
      if (data.user) {
        alert('Profile updated!');
      } else {
        alert('Update failed');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Error updating profile');
    }
  };

  return (
    <div className="profile-settings-container">
      <div className="profile-settings-card">
        <h2 className="profile-settings-title">Account Setting</h2>
        <div className="profile-settings-tabs">
          <span 
            className={activeTab === 'profile' ? 'active' : ''}
            onClick={() => setActiveTab('profile')}
            style={{ cursor: 'pointer' }}
          >
            PROFILE
          </span>
          <span 
            className={activeTab === 'bookings' ? 'active' : ''}
            onClick={() => setActiveTab('bookings')}
            style={{ cursor: 'pointer' }}
          >
            MY BOOKINGS
          </span>
        </div>
        
        {activeTab === 'profile' ? (
          <form className="profile-settings-form" onSubmit={handleSubmit}>
            <div className="profile-image-section">
              <img
                src={previewImg || '/dummy.png'}
                alt="Profile"
                className="profile-image"
                onClick={() => fileInputRef.current.click()}
                style={{ cursor: 'pointer' }}
              />
              <label htmlFor="profile-image-upload" className="change-link" onClick={() => fileInputRef.current.click()}>
                CHANGE
              </label>
              <input
                id="profile-image-upload"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleImageChange}
              />
            </div>
            <div className="profile-fields">
              <label>
                NAME
                <input type="text" name="name" value={profile.name} onChange={handleChange} />
              </label>
              <label>
                EMAIL
                <input type="email" name="email" value={profile.email} disabled />
              </label>
              <label>
                GENDER
                <select name="gender" value={profile.gender} onChange={handleChange}>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label>
                PASSWORD
                <input type="password" name="password" value={profile.password} onChange={handleChange} placeholder="New password" />
              </label>
            </div>
            <button type="submit" className="save-btn">SAVE</button>
          </form>
        ) : (
          <div className="bookings-tab-content">
            <BookingHistory />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

