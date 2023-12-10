import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Typography, Box, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home'; 
import SearchIcon from '@mui/icons-material/Search';

function Footer() {
    return (
        <Paper elevation={3} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
            <BottomNavigation>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="caption" color="textSecondary" sx={{ ml: 2, mt: 1 }}>
                        Powered by <Link href="https://www.imdb.com/" target="_blank">IMDb API</Link>
                    </Typography>
                </Box>
                <BottomNavigationAction icon={<HomeIcon />} component={Link} to="/" />
                <BottomNavigationAction icon={<SearchIcon />} component={Link} to="/search" />
            </BottomNavigation>
        </Paper>
    );
}

export default Footer;

