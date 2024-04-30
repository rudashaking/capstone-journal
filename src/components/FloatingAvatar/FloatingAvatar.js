import React from 'react';
import './FloatingAvatar.scss'; 
import { useState, } from 'react';
import { useLocation } from 'react-router-dom';

const FloatingAvatar = ({ toggleSidebar }) => {
    const [isHovered, setIsHovered] = useState(false);
    const location = useLocation();
    const [hoverMessage, setHoverMessage] = useState('Click Me');
    const handleMouseOver = () => {
        setIsHovered(true);
        if (location.pathname === '/login' || location.pathname === '/') {
            setHoverMessage('Sign In First');
        } else {
            setHoverMessage('Ready To Listen');
        }
    }

    const handleMouseOut = () => {
        setIsHovered(false);
    }

    const handleClick = () => {
        if (!(location.pathname === '/login' || location.pathname === '/')) {
            toggleSidebar(); 
        }
    }

    return (
        <div className={`floating-avatar ${isHovered ? 'hovered' : ''}`} 
             onMouseOver={handleMouseOver}
             onMouseOut={handleMouseOut}
             onClick={handleClick}>
{isHovered && <div className="hover-message">{hoverMessage}</div>}
    
        </div>
    );
}

export default FloatingAvatar;
