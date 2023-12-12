import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import * as client from '../components/user/client';
import MovieIcon from './movie.png';
import HomeIcon from '@mui/icons-material/Home'; 
import PersonIcon from '@mui/icons-material/Person'; 
import SearchIcon from '@mui/icons-material/Search';
import { useLocation } from 'react-router-dom';

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" />


function Header({ loggedIn, setLoggedIn, setUsername }: { loggedIn: boolean, setLoggedIn: (loggedIn: boolean) => void, setUsername: (username: string) => void }) {
    const navigate = useNavigate();
    const location = useLocation();

    const isLoginOrRegister = location.pathname === '/login' || location.pathname === '/register'|| location.pathname.startsWith('/profile/');
    const appBarStyles = {
        width: '100%',
        marginBottom: '20px',
        height: '80px',
        backgroundColor: 'teal',
        ...(isLoginOrRegister && { width: '101%', marginLeft: '-10px', marginTop: '-10px' })
    };
    const stickyPaths = ['/profile', '/login', '/register'];
    const isStickyPath = stickyPaths.some(path => location.pathname.startsWith(path));
    const appBarPosition = isStickyPath ? 'sticky' : 'fixed';
    const handleLogout = async () => {
        const response = await client.signout();
        setLoggedIn(false);
        setUsername('Guest');
        navigate('/');
    }
    return (
        <AppBar position={appBarPosition} sx={appBarStyles}>
            <Toolbar>
            <img src={MovieIcon} alt="Movies" style={{ width: '40px', height: '40px' }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Pacifico', fontSize: '2rem' }}>
                 MovieMate
                </Typography>
                <Button color="inherit" component={Link} to="/">
                <HomeIcon/> Home
                </Button>
                <Button color="inherit" component={Link} to="/search">
                <SearchIcon /> Search
                </Button>
                {loggedIn ? (
                    <span>
                        <Button color="inherit" component={Link} to="/profile">
                        <PersonIcon /> Profile
                        </Button>
                        <Button variant="outlined" color='inherit' component={Link} to='/login' onClick={handleLogout}>
                            Logout
                        </Button>
                    </span>
                ) : (
                    <Button variant="outlined" color="inherit" component={Link} to="/login">
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>

    );
}

export default Header;