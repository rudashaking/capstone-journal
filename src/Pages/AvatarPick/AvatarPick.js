import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress'; 
import axios from 'axios';


const AvatarPick = ({ updateUser }) => {
  const [user, setUser] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState('');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/users/:userId/avatar');
      console.log('User data:', response.data);
      setUser(response.data);
      setSelectedAvatar(response.data.avatar || 'default'); 
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  

  const handleAvatarSelection = (avatar) => {

    if (avatar === 'jackie' || avatar === 'bash') {
      setSelectedAvatar(avatar);
    } else {
      console.error('Invalid avatar selection');
    }
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
        <div onClick={() => handleAvatarSelection('jackie')} className={selectedAvatar === 'jackie' ? 'avatar-option selected' : 'avatar-option'}>
        <div className="jackie"></div>
          <p>Jackie</p>
        </div>
        <div onClick={() => handleAvatarSelection('bash')} className={selectedAvatar === 'bash' ? 'avatar-option selected' : 'avatar-option'}>
          <div className="bash"></div>
          <p>Bash</p>
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
