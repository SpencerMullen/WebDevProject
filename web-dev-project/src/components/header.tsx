// components/header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import * as client from '../components/user/client';
let loggedIn = true; //need to convert this to some global variable or something like that... I don't think the header
// will change when you login or logout... need to use react hooks of some sort.

function Header() {
    const handleLogout = async () => {
        console.log('this worked')
        client.signout();
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
