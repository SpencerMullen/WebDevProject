import { useState, useEffect } from 'react';
import { Container, Typography, Avatar, TextField, Button, Grid, Paper } from '@mui/material';
import GenreSelectionForm from './genreSelectionForm';
import * as client from '../../user/client'

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

  useEffect(() => {
    const getUser = async () => {
      const userInfo = await client.getCurrentUser();
      console.log("userinfo: ", userInfo);
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
    console.log("userData: ", userData);
    getUser();
  }, []);

  return (
    <Container maxWidth="sm">
      <Grid container spacing={4} justifyContent="center" style={{ marginTop: '20px' }}>
        <Grid item>
          <Avatar src={userData.profilePicLink} alt="Profile" style={{ width: 175, height: 175 }} />
          <Typography variant="h4" style={{ marginTop: '20px'}}>Username: {userData.username}</Typography>
          <Typography variant="h6">Email: {userData.email}</Typography>
          <Typography variant='h6'>Name: {userData.firstName} {userData.lastName}</Typography>
          <Typography variant='h6'>User Type: {userData.userType}</Typography>
        </Grid>

        
      </Grid>
    </Container>
  )
}
