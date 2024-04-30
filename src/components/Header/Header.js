import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../../assets/notitlelogo.png';
import mohan from '../../assets/Mohan-muruge.jpg'
import { useEffect } from 'react';
import "./Header.scss";

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [username, setUsername] = useState(null); // Initialize username state with null
  const [loading, setLoading] = useState(true); 
  const location = useLocation();

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  useEffect(() => {
    // Simulate an API call to fetch the username
    const fetchUsername = async () => {
      try {
        // Simulate fetching username data (replace with actual API call)
        const response = await fetch('https://api.example.com/username');
        const data = await response.json();
        setUsername(data.username); // Set the username in state
        setLoading(false); // Update loading state to false once username is fetched
      } catch (error) {
        console.error('Error fetching username:', error);
        setLoading(false); // Update loading state to false in case of error
      }
    };

    fetchUsername(); // Call the fetchUsername function when component mounts
  }, []); // Empty dependency array ensures useEffect runs only once after component mounts

  // Function to get the header text based on the current location
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
