import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import './AvatarPick.scss'; 

const AvatarPick = ({ updateUser }) => {
  const [user, setUser] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState('');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/api/user');
      setUser(response.data);
      setSelectedAvatar(response.data.avatar || 'default'); // Set default avatar if no previous avatar exists
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleAvatarSelection = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const saveChanges = async () => {
    try {
      await updateUser({ ...user, avatar: selectedAvatar });
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const updateProfilePicture = async (picture) => {
    try {
      await updateUser({ ...user, profilePicture: picture });
    } catch (error) {
      console.error('Error updating profile picture:', error);
    }
  };

  if (!user) {
    return (
      <div className="loading-container">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="settings-page">
      <h2 className="title">Avatar Selection</h2>
      <div className="avatar-options">
        {/* Replace avatar URLs with DiceBear API endpoint */}
        <div onClick={() => handleAvatarSelection('male')} className={selectedAvatar === 'male' ? 'avatar-option selected' : 'avatar-option'}>
          <img src={`https://avatars.dicebear.com/api/male/${user.username}.svg`} alt="Male Avatar" />
          <p>Male</p>
        </div>
        <div onClick={() => handleAvatarSelection('female')} className={selectedAvatar === 'female' ? 'avatar-option selected' : 'avatar-option'}>
          <img src={`https://avatars.dicebear.com/api/female/${user.username}.svg`} alt="Female Avatar" />
          <p>Female</p>
        </div>
        {/* Default avatar */}
        <div onClick={() => handleAvatarSelection('default')} className={selectedAvatar === 'default' ? 'avatar-option selected' : 'avatar-option'}>
          <img src={`https://avatars.dicebear.com/api/human/${user.username}.svg`} alt="Default Avatar" />
          <p>Default</p>
        </div>
      </div>
      <button className="save-button" onClick={saveChanges}>Save Changes</button>
      <div>
        <input type="file" accept="image/*" onChange={(e) => updateProfilePicture(e.target.files[0])} />
      </div>
    </div>
  );
};

export default AvatarPick;
