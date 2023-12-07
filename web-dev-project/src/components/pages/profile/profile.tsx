import { useState } from 'react';
import { Container, Typography, Avatar, TextField, Button, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { ConfigurationServicePlaceholders } from 'aws-sdk/lib/config_service_placeholders';

export default function Profile() {
  const [username] = useState('user'); // Replace with actual user data
  const [email] = useState('user@example.com'); // Replace with actual user data
  const [profilePic, setProfilePic] = useState('https://via.placeholder.com/175');
  const [newPicUrl, setNewPicUrl] = useState('');

  const handlePicChange = () => {
    if (newPicUrl) {
      setProfilePic(newPicUrl);
      setNewPicUrl('');
    }
  };

  const genreList = async () => {
    try {
      const genres = await axios.get('http://localhost:8081/genres/movies')
      console.log(genres)
      return genres
    } catch (e) {
      console.log(e);
    }
  }
  genreList();

  // Dummy data for top rated movies
  const topRatedMovies = ['Movie 1', 'Movie 2', 'Movie 3'];

  return (
    <Container maxWidth="sm">
      <Grid container spacing={4} justifyContent="center" style={{ marginTop: '20px' }}>
        <Grid item>
          <Avatar src={profilePic} alt="Profile" style={{ width: 175, height: 175 }} />
          <Typography variant="h4" style={{ marginTop: '20px'}}>{username}</Typography>
          <Typography variant="h6">{email}</Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="New Profile Picture URL"
            value={newPicUrl}
            onChange={(e) => setNewPicUrl(e.target.value)}
            variant="outlined"
          />
          <Button variant="contained" color="primary" onClick={handlePicChange} style={{ marginTop: '10px' }}>
            Update Picture
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5">Top 3 Rated Movies</Typography>
          {topRatedMovies.map((movie, index) => (
            <Paper key={index} style={{ padding: '10px', marginTop: '10px' }}>
              <Typography>{movie}</Typography>
            </Paper>
          ))}
        </Grid>
      </Grid>
    </Container>
  )
}
