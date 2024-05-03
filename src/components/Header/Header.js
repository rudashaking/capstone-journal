import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom'; 
import logo from '../../assets/notitlelogo.png';
import mohan from '../../assets/Mohan-muruge.jpg';
import "./Header.scss";

const Header = () => {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const params = useParams(); 

 

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
        <div className="header__text">{getHeaderText()}</div>
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
