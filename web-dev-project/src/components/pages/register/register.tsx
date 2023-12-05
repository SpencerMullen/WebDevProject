import { useState } from 'react';
import { Container, TextField, Button, Typography, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('user');
  const navigate = useNavigate();

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // Add registration logic here
    console.log(username, email, password, confirmPassword, userType)

    try {
      axios.post('http://localhost:8081/users', {
        username: username,
        email: email,
        password: password,
        userType: userType
      })
      console.log("Successfully sent user data to backend")
      navigate('/login');
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Register an Account
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 3 }}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FormControl component="fieldset" style={{ marginTop: 20 }}>
            <FormLabel component="legend">User Type</FormLabel>
            <RadioGroup
              row
              aria-label="userType"
              name="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <FormControlLabel value="user" control={<Radio />} label="User" />
              <FormControlLabel value="admin" control={<Radio />} label="Admin" />
            </RadioGroup>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: '24px 0 16px' }}
          >
            Register
          </Button>
          <Typography variant="body2" align="center">
            Already have an account?{' '}
            <Link to="/login" style={{ textDecoration: 'none' }}>
              Login
            </Link>
          </Typography>
        </form>
      </div>
    </Container>
  )
}