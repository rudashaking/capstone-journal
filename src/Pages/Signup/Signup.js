import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Paper } from '@mui/material';
import axios from 'axios';
import './Signup.scss';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); 

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8080/signup', { username, password });
      if (response.status === 201) {
        const userId = response.data.userId; 
        localStorage.setItem('userId', userId); 
        setSuccess(true);
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        navigate(`/journal-collection/${userId}`); 
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  

  const handleCloseModal = () => {
    setSuccess(false);
    setError('');
  };

  return (
    <div className="signup">
      <div className='signup__logo'></div>
      <Paper elevation={3} className="signup__form--container">
        <h2>Sign Up for Your Journal</h2>
        <form className="signup__form" onSubmit={handleSignup}>
          <div className="signup__form--group">
            <TextField
              className="signup__form--input"
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />
          </div>
          <div className="signup__form--group">
            <TextField
              className="signup__form--input"
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          </div>
          <div className="signup__form--group">
            <TextField
              className="signup__form--input"
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
            />
          </div>
          {error && <p className="signup__errorMessage">{error}</p>}
          <Button className="signup__form--button" type="submit" variant="contained" color="primary">Sign Up</Button>
        </form>
        <p className="signup__login--text">Already have an account? <Link to="/login" className="signup__login--link">Login</Link></p>
      </Paper>
      <Dialog open={success} onClose={handleCloseModal}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <p>Signup successful!</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SignupPage;