import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Avatar, Grid, Paper, Button } from '@mui/material';
import { User } from '../../../types';
import * as client from '../../../components/user/client';
import genreIdToName from '../../../utils/genreIdToName';

export default function ProfileId() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [profilePic, setProfilePic] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [favoriteGenres, setFavoriteGenres] = useState<string[]>([]);
  const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState<boolean>(false);

  useEffect(() => {
    const getUserProfile = async () => {
      const userInfo = await client.findUserById(id);
      setUserProfile(userInfo);
      setUsername(userInfo.username);
      setEmail(userInfo.email);
      setProfilePic(userInfo.profilePicLink);
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      if (userInfo.genreList.length > 0) {
        let favGenresString = userInfo.genreList.map((genreId: any) => parseInt(genreId));
        favGenresString = genreIdToName(favGenresString);
        setFavoriteGenres(favGenresString);
      }
      const currentUser = await client.getCurrentUser();
      if (currentUser) {
        setIsCurrentUserAdmin(currentUser.userType === 'ADMIN');
      }
    }
    getUserProfile();
  }, []);

  const handleDeleteUser = async () => {
    await client.deleteUser(id);
    navigate('/home');
  }


  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>   
    <Paper elevation={3} sx={{ p: 4, mb: 4 }}> 
    <Grid container spacing={4} justifyContent="center" style={{ marginTop: '20px' }}>
  <Grid item>
    <Avatar src={profilePic} alt="Profile" style={{ width: 175, height: 175 }} />
    <Typography variant="h4" style={{ marginTop: '20px' }}>{userProfile.username}</Typography>
    {/* Delete user button if current user is admin */}
    {isCurrentUserAdmin && (
      <Button variant="contained" component="label" style={{ marginTop: '20px' }} onClick={handleDeleteUser}>
        Delete User
      </Button>
    )}
  </Grid>

  <Grid item xs={12}>
    <Typography variant="h5">About Me</Typography>
  </Grid>
  <Grid item xs={12}>
    <Typography variant="body1">Username: {username}</Typography>
  </Grid>
  <Grid item xs={12}>
    <Typography variant="body1">Email: {email}</Typography>
  </Grid>
  <Grid item xs={12}>
    <Typography variant="body1">First Name: {firstName}</Typography>
  </Grid>
  <Grid item xs={12}>
    <Typography variant="body1">Last Name: {lastName}</Typography>
  </Grid>
  <Grid item xs={12}>
    <Typography variant="body1">Favorite Genres: {favoriteGenres}</Typography>
  </Grid>
</Grid>
      </Paper>  
    </Container>
  )
}
