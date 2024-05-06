import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import "./LoginPage.scss";
import TextField from "@mui/material/TextField";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8080/login', {
        username,
        password,
      });
  
      const { token, userId } = response.data;
  
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
  
      console.log('userId', userId); 
  
      navigate(`/journal-collection/${userId}`);
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Failed to log in. Please check your credentials and try again.');
    }
  };

  return (
    <div className="login">
      <div className='login__logo'></div>
      <form onSubmit={handleLogin} className="login__form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login__input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login__input"
        />
        <button type="submit" className="login__button">Log In</button>
        {error && <p className="login__error">{error}</p>}
      </form>
      <p className="login__signup">Don't have an account? <Link to="/signup">Sign Up</Link></p>
      <TextField
              className="opener"
              multiline
              InputProps={{
                readOnly: true,
              }}
              value="
              Upon login you meet Jackie, your friendly AI companion! In the future, I'll have even more capabilities, but for now, I can analyze your mood based on what you say and offer suggestions to improve it. So feel free to express yourself, and I'll do my best to provide helpful insights and support along the way. Together, we can explore your emotions and work towards a more positive and fulfilling experience."
              
              variant="outlined"
              halfWidth
              rows={10}
            />
    </div>
  );
};

export default LoginPage;
