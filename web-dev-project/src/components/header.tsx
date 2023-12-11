import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import * as client from '../components/user/client';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import HomeIcon from '@mui/icons-material/Home'; 
import PersonIcon from '@mui/icons-material/Person'; 
import SearchIcon from '@mui/icons-material/Search';
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" />


function Header({ loggedIn, setLoggedIn, setUsername }: { loggedIn: boolean, setLoggedIn: (loggedIn: boolean) => void, setUsername: (username: string) => void }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const response = await client.signout();
        setLoggedIn(false);
        setUsername('Guest');
        navigate('/');
    }
    return (
        <AppBar position="static" sx={{ width: '100%', marginBottom: '20px', marginTop: '0px', height: '80px', backgroundColor: 'teal' }}>
            <Toolbar>
            <LocalMoviesIcon/>
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