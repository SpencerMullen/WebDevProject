import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Avatar, Grid, Paper } from '@mui/material';
import { User, Movie } from '../../../types';
import * as client from '../../../components/user/client';
import genreIdToName from '../../../utils/genreIdToName';

export default function ProfileId() {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [favoriteGenres, setFavoriteGenres] = useState<string[]>([]);

  useEffect(() => {
    const getUserProfile = async () => {
      const userInfo = await client.findUserById(id);
      setUserProfile(userInfo);
      setUsername(userInfo.username);
      setEmail(userInfo.email);
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      const favGenresString = userInfo.genreList.map((genreId) => genreIdToName(genreId));
      setFavoriteGenres(favGenresString);
    }
    getUserProfile();
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
          {/*<Typography variant="h5">Top 3 Rated Movies</Typography>
          {movies.map((movie, index) => (
            <Paper key={index} style={{ padding: '10px', marginTop: '10px' }}>
              <Typography>{movie.title} </Typography>
            </Paper>
          ))}*/}

          <Typography variant="h5">About Me</Typography>
          <Typography>Username: {username}</Typography>
          <Typography>Email: {email}</Typography>
          <Typography>First Name: {firstName}</Typography>
          <Typography>Last Name: {lastName}</Typography>
          <Typography>Favorite Genres: {favoriteGenres}</Typography>

        </Grid>

      </Grid>
    </Container>
  )
}
