import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Typography, Box, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home'; 
import SearchIcon from '@mui/icons-material/Search';
import { useLocation } from 'react-router-dom';

function Footer() {

    const location = useLocation();

    const isProfilePage = location.pathname.startsWith('/profile');
    const isProfilePageExact = location.pathname === '/profile' || location.pathname === '/profile/';
    const footerPosition = isProfilePage || isProfilePageExact ? 'sticky' : 'fixed';

    return (
        <Paper elevation={3} sx={{ position: footerPosition, bottom: 0, left: 0, right: 0 }}>
            <BottomNavigation>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="caption" color="textSecondary" sx={{ ml: 2, mt: 1 }}>
                        Powered by <Link to="https://www.themoviedb.org/?language=en-US" target="_blank">TMDb API</Link>
                    </Typography>
                </Box>
                <BottomNavigationAction icon={<HomeIcon />} component={Link} to="/" />
                <BottomNavigationAction icon={<SearchIcon />} component={Link} to="/search" />
            </BottomNavigation>
        </Paper>
    );
}

export default Footer;