import { useState, useEffect } from 'react';
import { Container, Typography, Avatar, TextField, Button, Grid, Paper, Input } from '@mui/material';
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
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const handleSelectGenres = async (genres: string[]) => {
    setSelectedGenres(genres);
    const genreIds = genres.map((genre) => genre.id);
    setUserData({ ...userData, genreList: genreIds });
  }

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
    <Container maxWidth="sm">
      <Grid container spacing={4} justifyContent="center" style={{ marginTop: '20px' }}>
        <Grid item>
          <Avatar src={userData.profilePicLink} alt="Profile" style={{ width: 175, height: 175 }} />
          <Button variant="contained" component="label" style={{ marginTop: '20px' }} onClick={handleUpdateUser}>
            Update User</Button>
        </Grid>
        <Grid item>
          <Typography variant="h4">Username:<TextField id="outlined-basic"
            variant="outlined" value={userData.username} onChange={handleUpdateUsername} />
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h4">Email:<TextField id="outlined-basic" onChange={handleUpdateEmail}
            variant="outlined" value={userData.email} /> </Typography>
        </Grid>
        <Grid item>
          <Typography variant='h4'>First Name:<TextField id="outlined-basic" variant="outlined" onChange={handleUpdateFirstName}
            value={userData.firstName} /></Typography>
          <Typography variant='h4'>Last Name:<TextField id="outlined-basic" variant="outlined" onChange={handleUpdateLastName}
            value={userData.lastName} /></Typography>
        </Grid>
        <Grid item>
          <Typography variant="h4">User Type: {userData.userType}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h4">Favorite Genres</Typography>
          <GenreSelectionForm selectedGenres={selectedGenres} setSelectedGenres={handleSelectGenres} genreIds={userData.genreList} />
        </Grid>

      </Grid>
    </Container>
  )
}
