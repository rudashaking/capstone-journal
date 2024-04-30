import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../../assets/notitlelogo.png';
import mohan from '../../assets/Mohan-muruge.jpg'
import { useEffect } from 'react';
import "./Header.scss";

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [username, setUsername] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const location = useLocation();


  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  useEffect(() => {
   
    const fetchUsername = async () => {
      try {
      
        const response = await fetch('https://api.example.com/username');
        const data = await response.json();
        setUsername(data.username); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching username:', error);
        setLoading(false); 
      }
    };

    fetchUsername(); 
  }, []); 

  
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
    <div className="header"> Insightful
      <div className="avatar" onClick={toggleSidebar}>
        <img src={logo} alt="User Avatar" />
      </div>
      <div className="header-text">{getHeaderText()}</div>
      <div className="avatar" onClick={toggleSidebar}>
        Profile <img src={mohan} alt="AI Avatar" />
      </div>
    </div>
  );
};

export default Header;
