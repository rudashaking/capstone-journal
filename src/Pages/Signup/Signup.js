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
        setSuccess(true);
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        navigate('/avatarPick');
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
    <div className="signup-page">
      <Paper elevation={3} className="form-container">
        <h2>Sign Up for Your Journal</h2>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />
          </div>
          <div className="form-group">
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          </div>
          <div className="form-group">
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <Button type="submit" variant="contained" color="primary">Sign Up</Button>
        </form>
        <p className="login-text">Already have an account? <Link to="/login" className="login-link">Login</Link></p>
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
