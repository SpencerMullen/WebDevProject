import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import * as dotenv from 'dotenv';

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
import axios from 'axios'

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    const checkLoggedIn = async () => {
      const userInfo = await client.getUserInfo();
      const loggedIn = userInfo !== null;
      setLoggedIn(loggedIn);
    }
    checkLoggedIn();
  }, []);

  useEffect(() => {
    const tryThis = async () => {
      const apiurl = "http://localhost:8081/users/current";
      const response = await axios.get(apiurl);
      console.log("RESPONSE ===", response);
    }
    tryThis();
  }, []);
  // dotenv.config();
  return (
    <BrowserRouter>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/details" element={<Details />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
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
