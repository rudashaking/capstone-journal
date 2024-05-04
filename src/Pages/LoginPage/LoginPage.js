import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import "./LoginPage.scss";

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
    <div className="login-page">
      <div className='login-page__logo'></div>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-page__input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-page__input"
        />
        <button type="submit" className="login-page__button">Log In</button>
        {error && <p className="login-page__error">{error}</p>}
      </form>
      <p className="login-page__signup">Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
};

export default LoginPage;
