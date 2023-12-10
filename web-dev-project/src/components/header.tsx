// components/header.js
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import * as client from '../components/user/client';

function Header({ loggedIn, setLoggedIn }: { loggedIn: boolean, setLoggedIn: (loggedIn: boolean) => void}) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        // console.log('this worked')
        await client.signout();
        setLoggedIn(false);
        navigate('/');
    }
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    My App
                </Typography>
                <Button color="inherit" component={Link} to="/">
                    Home
                </Button>
                <Button color="inherit" component={Link} to="/search">
                    Search
                </Button>
                {loggedIn ? (
                    <span>
                        <Button color="inherit" component={Link} to="/profile">
                            Profile
                        </Button>
                        <Button color='inherit' component={Link} to='/login' onClick={handleLogout}>
                            Logout
                        </Button>
                    </span>
                ) : (
                    <Button color="inherit" component={Link} to="/login">
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Header;
