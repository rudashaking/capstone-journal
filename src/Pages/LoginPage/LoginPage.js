import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "../LoginPage/LoginPage.scss"
import axios from 'axios'; 

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8080/login', { 
        username,
        password
      });
      
    
      const token = response.data.token;

    
      localStorage.setItem('token', token);

    
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    
      navigate('/journal-collection');
    } catch (error) {
     
      console.error('Login failed:', error.response.data.message);
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-page">
    
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
        {error && <p>{error}</p>}
      </form>
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
};

export default LoginPage;
