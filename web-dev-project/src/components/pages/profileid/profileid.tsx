import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Avatar, Grid, Paper } from '@mui/material';
import { User, Movie } from '../../../types';
import axios from 'axios';

export default function ProfileId() {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);

  const fetchUserProfile = async (userId: string | undefined) => {
    const response = await axios.get(`http://localhost:8081/users/${userId}`);
    const profile = response.data as User;
    setUserProfile(profile);
    
    if (!profile) return;

    profile.likedMovies.forEach(async (movieId) => {
      console.log(`fetching movie ${movieId}`);
      const response = await axios.get(`http://localhost:8081/searchById/${movieId}`)

      if (response.status !== 200) return;
      setMovies((movies) => [...movies, response.data]);
    });
  };

  useEffect(() => {
    fetchUserProfile(id);
    // console.log('user profile fetched');
  }, [id]);

  if (!userProfile) {
    return <div>Loading...</div>; // or any other loading state representation
  }

  return (
    <Container maxWidth="sm">
      <Grid container spacing={4} justifyContent="center" style={{ marginTop: '20px' }}>
        <Grid item>
          <Avatar src={userProfile.profilePic} alt="Profile" style={{ width: 175, height: 175 }} />
          <Typography variant="h4" style={{ marginTop: '20px' }}>{userProfile.username}</Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5">Top 3 Rated Movies</Typography>
          {movies.map((movie, index) => (
            <Paper key={index} style={{ padding: '10px', marginTop: '10px' }}>
              <Typography>{movie.title} </Typography>
            </Paper>
          ))}
        </Grid>

        {/* Additional sections can be added here */}
      </Grid>
    </Container>
  )
}
