import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Menu, MenuItem } from "@mui/material";
import "./Header.scss";

const Header = () => {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        if (userId && !["/login", "/signup", "/"].includes(location.pathname)) {
          const response = await axios.get(
            `http://localhost:8080/users/${userId}`
          );
          setUsername(response.data.username);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching username:", error);
        setLoading(false);
      }
    };

    fetchUsername();
  }, [userId, location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleSupportPage = () => {
    navigate("/support");
    handleCloseMenu();
  };

  return (
    <div className="header">
      <div className="header__left-section">
        <Link to="/journal-collection/:id">
          <div className="header__logo"></div>
        </Link>
        <div className="header__title">Insightful</div>
        <div className="header__text">
          {loading
            ? "Loading..."
            : username
            ? `Welcome back ${username}!`
            : "Welcome back!"}
        </div>
      </div>
      <div className="header__right-section">
        <div className="header__profile" onClick={handleProfileClick}>
          <span className="header__profile-text">{username}</span>
          <div className="header__profile-img"></div>
        </div>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          getContentAnchorEl={null}
        >
          <MenuItem onClick={handleSupportPage}>Support Page</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
