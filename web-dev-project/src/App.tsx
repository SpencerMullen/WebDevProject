import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Details from './components/pages/details/details'
import Home from './components/pages/home/home'
import Login from './components/pages/login/login'
import Profile from './components/pages/profile/profile'
import ProfileId from './components/pages/profileid/profileid'
import Search from './components/pages/search/search'
import Header from './components/header'
import Footer from './components/footer'
import Register from './components/pages/register/register'

import * as client from './components/user/client';
import { useState, useEffect } from 'react'

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  useEffect(() => {
    const checkLoggedIn = async () => {
      const userInfo = await client.getUserInfo();
      const loggedIn = userInfo !== null;
      setLoggedIn(loggedIn);
    }
    const getUsername = async () => {
      const userInfo = await client.getUserInfo();
      if (userInfo) {
        setUsername(userInfo.username);
      } else {
        setUsername('Guest');
      }
    }
    checkLoggedIn();
    getUsername();
  }, []);


  // dotenv.config();
  return (
    <BrowserRouter>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUsername={setUsername} />
      <Routes>
        <Route path="/" element={<Home username={username} loggedIn={loggedIn} />} />
        <Route path="/home" element={<Home username={username} loggedIn={loggedIn} />} />
        <Route path="/details" element={<Details />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setUsername={setUsername} username={username} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<ProfileId />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App
