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

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
        <Route path="/login" element={<Login />} />
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
