import { useState } from 'react'
import { Link, Container, TextField, Button, Typography, Box } from '@mui/material';


export default function Login() {
    
    const[username, setUsername] = useState<string>('')
    const[password, setPassword] = useState<string>('')

    const handleLogin = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        console.log(username, password)
        {/**TODO: Need authentication functionality */}
    }
    return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Sign In
          </Button>
        </Box>
      </Box>
        <Typography variant="body2" style={{ marginTop: '16px', textAlign: 'center' }}>
            Don't have an account?{' '}
            <Link href="/register" style={{ textDecoration: 'none' }}>
            Register here
            </Link>
        </Typography>
    </Container>
    )
}