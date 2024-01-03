/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Container, Typography, Avatar, TextField, Button, Grid, Paper } from '@mui/material';
import GenreSelectionForm from './genreSelectionForm';
import * as client from '../../user/client'
import { Genre } from '../../../types';

export default function Profile() {
  const [userData, setUserData] = useState<any>({
    _id: "",
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    userType: "",
    profilePicLink: "",
    genreList: [],
    ratedMovies: [],
    favoriteMovies: [],
    watchListId: [],
  });
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const handleSelectGenres = async (genres: Genre[]) => {
    setSelectedGenres(genres);
    const genreIds = genres.map((genre) => genre.id);
    setUserData({ ...userData, genreList: genreIds });
  }

  const [newPicUrl, setNewPicUrl] = useState<string>(''); // State for the new picture URL

  const handlePicUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPicUrl(event.target.value);
  };

  const handlePicUpdate = async () => {
    setUserData({ ...userData, profilePicLink: newPicUrl });
    // Optionally reset the newPicUrl state here if needed
    setNewPicUrl('');
  };
  const handleUpdateUsername = (event: any) => {
    setUserData({ ...userData, username: event.target.value });
  }

  const handleUpdateEmail = (event: any) => {
    setUserData({ ...userData, email: event.target.value });
  }

  const handleUpdateFirstName = (event: any) => {
    setUserData({ ...userData, firstName: event.target.value });
  }

  const handleUpdateLastName = (event: any) => {
    setUserData({ ...userData, lastName: event.target.value });
  }

  useEffect(() => {
    const getUser = async () => {
      const userInfo = await client.getCurrentUser();
      if (userInfo) {
        setUserData({
          _id: userInfo._id,
          username: userInfo.username,
          email: userInfo.email,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          userType: userInfo.userType,
          profilePicLink: userInfo.profilePicLink,
          genreList: userInfo.genreList,
          ratedMovies: userInfo.ratedMoviesId,
          favoriteMovies: userInfo.favoriteMoviesId,
          watchListId: userInfo.watchList,
        });
      }
    }
    getUser();
  }, []);

  const handleUpdateUser = async () => {
    await client.updateUser(userData);
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} display="flex" flexDirection="column" alignItems="center">
            <Avatar src={userData.profilePicLink} alt="Profile" sx={{ width: 175, height: 175 }} />
            <Button 
            variant="contained" 
            onClick={handleUpdateUser} 
            sx={{
              mt: 2,
              backgroundColor: 'teal', // Use the teal color for the button background
              '&:hover': {
                backgroundColor: 'darken(teal, 0.2)', // Optionally darken the button on hover
              },
            }}
            >
              Update User
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="New Profile Picture URL"
              value={newPicUrl}
              onChange={handlePicUrlChange}
              variant="outlined"
              margin="normal"
            />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handlePicUpdate} 
              sx={{
                mt: 2,
                backgroundColor: 'teal',
                '&:hover': {
                  backgroundColor: 'darken(teal, 0.2)',
                },
              }}>
              Update Picture
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={userData.username}
              onChange={handleUpdateUsername}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={userData.email}
              onChange={handleUpdateEmail}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              value={userData.firstName}
              onChange={handleUpdateFirstName}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              value={userData.lastName}
              onChange={handleUpdateLastName}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              User Type: {userData.userType}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Favorite Genres
            </Typography>
            <GenreSelectionForm selectedGenres={selectedGenres} setSelectedGenres={handleSelectGenres} genreIds={userData.genreList} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
