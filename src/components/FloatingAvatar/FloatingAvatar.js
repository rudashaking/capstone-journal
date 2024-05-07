import React, { useState, useEffect } from "react";
import "./FloatingAvatar.scss";
import { useLocation } from "react-router-dom";

const FloatingAvatar = ({ toggleSidebar }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const [hoverMessage, setHoverMessage] = useState("Click Me");

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/") {
      setHoverMessage("Sign In First");
    } else {
      setHoverMessage(isSidebarOpen ? "Close Me" : "Click for More");
    }
  }, [location.pathname, isSidebarOpen]);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    if (!(location.pathname === "/login" || location.pathname === "/")) {
      toggleSidebar();
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  return (
    <div
      className={`floating-avatar ${isHovered ? "hovered" : ""}`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={handleClick}
    >
      {isHovered && <div className="hover-message">{hoverMessage}</div>}
    </div>
  );
};

export default FloatingAvatar;
