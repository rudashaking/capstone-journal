import React, { useState, useEffect } from 'react';
import './FloatingAvatar.scss'; 
import { useLocation } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';

const FloatingAvatar = ({ toggleSidebar }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isAlertShown, setIsAlertShown] = useState(false);
    const location = useLocation();
    const [hoverMessage, setHoverMessage] = useState('Click Me');

    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/') {
            setHoverMessage('Sign In First');
        } else {
            setHoverMessage('click for more');
        }
    }, [location.pathname]);

    const handleMouseOver = () => {
        setIsHovered(true);
    }

    const handleMouseOut = () => {
        setIsHovered(false);
    }

    const handleClick = () => {
        if (!(location.pathname === '/login' || location.pathname === '/')) {
            toggleSidebar(); 
        }
    }

    useEffect(() => {
        setIsAlertShown(location.pathname === '/journal');
    }, []);

    return (
        <div className={`floating-avatar ${isHovered ? 'hovered' : ''}`} 
             onMouseOver={handleMouseOver}
             onMouseOut={handleMouseOut}
             onClick={handleClick}>
            {isHovered && <div className="hover-message">{hoverMessage}</div>}
            {isAlertShown && (
                <MuiAlert
                    severity="info"
                    onClose={() => setIsAlertShown(false)}
                    sx={{ position: 'fixed', top: '20px', left: '20px', zIndex: 9999 }}
                >
                    Hi, I'm Jackie here to help
                </MuiAlert>
            )}
        </div>
    );
}

export default FloatingAvatar;
