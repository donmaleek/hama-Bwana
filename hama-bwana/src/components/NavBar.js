// src/components/NavBar.js

import React from 'react';
import logo from '../assets/logo.png'; // Place your logo in the src/assets folder

const NavBar = () => {
  const navBarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#2F4F4F', // Dark slate gray color for the navbar background
    height: '80px', // Increased height for better visibility and spacing
    borderBottom: '2px solid #FFD700', // Gold color for bottom border
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    maxHeight: '100%', // Ensure the logo doesn't overflow the navbar
  };

  const logoImageStyle = {
    height: '100%', // Ensure the logo takes up the full height of the navbar
    maxWidth: '200px', // Increase the logo size
    objectFit: 'contain', // Maintain aspect ratio
  };

  const navLinksStyle = {
    listStyle: 'none',
    display: 'flex',
    gap: '20px',
    margin: 0,
    padding: 0,
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'white', // White color for links
    fontWeight: 'bold',
    fontSize: '1.2rem', // Increase font size for links
    transition: 'color 0.3s ease', // Smooth transition for hover effect
  };

  const linkHoverStyle = {
    color: '#FFD700', // Gold color for hover
  };

  return (
    <nav style={navBarStyle}>
      <div style={logoStyle}>
        <img src={logo} alt="Hama Bwana Logo" style={logoImageStyle} />
      </div>
      <ul style={navLinksStyle}>
        <li>
          <a href="/" style={linkStyle} onMouseOver={(e) => (e.target.style.color = linkHoverStyle.color)} onMouseOut={(e) => (e.target.style.color = linkStyle.color)}>Home</a>
        </li>
        <li>
          <a href="/featured-rentals" style={linkStyle} onMouseOver={(e) => (e.target.style.color = linkHoverStyle.color)} onMouseOut={(e) => (e.target.style.color = linkStyle.color)}>Featured Rentals</a>
        </li>
        <li>
          <a href="/about" style={linkStyle} onMouseOver={(e) => (e.target.style.color = linkHoverStyle.color)} onMouseOut={(e) => (e.target.style.color = linkStyle.color)}>About</a>
        </li>
        <li>
          <a href="/contact" style={linkStyle} onMouseOver={(e) => (e.target.style.color = linkHoverStyle.color)} onMouseOut={(e) => (e.target.style.color = linkStyle.color)}>Contact</a>
        </li>
        <li>
          <a href="/login" style={linkStyle} onMouseOver={(e) => (e.target.style.color = linkHoverStyle.color)} onMouseOut={(e) => (e.target.style.color = linkStyle.color)}>Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
