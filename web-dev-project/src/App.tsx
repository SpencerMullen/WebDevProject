import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Details from './components/pages/details/details'
import Home from './components/pages/home/home'
import Login from './components/pages/login/login'
import Profile from './components/pages/profile/profile'
import ProfileId from './components/pages/profileid/profileid'
import Search from './components/pages/search/search'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<ProfileId />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
