// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import FeaturedRentals from './components/FeaturedRentals';
import RecentRentals from './components/RecentRentals';
import Register from './components/Register';
import Profile from './components/Profile';
import Posting from './components/Posting';
import Login from './components/Login'; // Import Login component
import './App.css';
import logo from './assets/logo2.png'; // Adjust the path according to your project structure

function App() {
  return (
    <Router>
      <header className="navbar">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Hama Bwana Logo" />
          </Link>
        </div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/featured-rentals">Featured Rentals</Link>
          <Link to="/recent-rentals">Recent Rentals</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/featured-rentals" element={<FeaturedRentals />} />
          <Route path="/recent-rentals" element={<RecentRentals />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post" element={<Posting />} />
          <Route path="/login" element={<Login />} /> {/* Add route for Login component */}
        </Routes>
      </main>
      <footer>
        <Link to="/about">About</Link>
        <Link to="/terms">Terms of Service</Link>
        <Link to="/contact">Contact</Link>
      </footer>
    </Router>
  );
}

export default App;
