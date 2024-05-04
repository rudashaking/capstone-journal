import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom'; 
import axios from 'axios'; // Import axios for making HTTP requests
import "./Header.scss";

const Header = () => {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const userId = localStorage.getItem('userId');
 


  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${userId}`); 
      
        
        setUsername(response.data.username);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, [userId]);

  const getHeaderText = () => {
    if (location.pathname === '/') {
      return 'Welcome to Insightful';
    } else if (username) {
      return `Welcome back ${username}!`;
    } else {
      return 'Welcome back!';
    }
  };

  return (
    <div className="header">
      <div className="header__left-section">
        <div className="header__logo"></div>
        <div className="header__title">Insightful</div>
        <div className="header__text">{loading ? 'Loading...' : getHeaderText()}</div>
      </div>
      <div className="header__right-section">
        <div className="header__profile" >
          <span className="header__profile-text">Profile</span>
          <div className='header__profile-img'></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
