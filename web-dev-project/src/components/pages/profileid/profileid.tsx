import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Avatar, Grid, Paper } from '@mui/material';

export default function ProfileId() {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState(null);

  // Dummy fetch function - replace with actual API call
  const fetchUserProfile = async (userId) => {
    // Replace with actual fetch/request to your backend
    // Example response
    const response = {
      username: 'otherUser',
      profilePic: 'https://via.placeholder.com/175',
      topRatedMovies: ['Movie 1', 'Movie 2', 'Movie 3'],
    };
    setUserProfile(response);
  };

  useEffect(() => {
    fetchUserProfile(id);
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
          {userProfile.topRatedMovies.map((movie, index) => (
            <Paper key={index} style={{ padding: '10px', marginTop: '10px' }}>
              <Typography>{movie}</Typography>
            </Paper>
          ))}
        </Grid>

        {/* Additional sections can be added here */}
      </Grid>
    </Container>
  )
}
