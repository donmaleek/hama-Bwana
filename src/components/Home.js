import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from './Map';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Home.css';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState('');
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [region, setRegion] = useState('');
  const [county, setCounty] = useState('');
  const [subcounty, setSubcounty] = useState('');

  const fetchProperties = async () => {
    try {
      let url = 'http://localhost:5000/properties';

      // Adding filters based on region, county, subcounty
      if (region) {
        url += `?region=${region}`;
        if (county) {
          url += `&county=${county}`;
          if (subcounty) {
            url += `&subcounty=${subcounty}`;
          }
        }
      }

      const response = await axios.get(url);
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const fetchFeaturedProperties = async () => {
    try {
      const response = await axios.get('http://localhost:5000/properties/featured');
      setFeaturedProperties(response.data);
    } catch (error) {
      console.error('Error fetching featured properties:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  useEffect(() => {
    fetchProperties();
    fetchFeaturedProperties();
  }, [region, county, subcounty]);

  const handleSearchClick = () => {
    // Fetch properties with the current search criteria
    fetchProperties();
  };

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
  };

  const handleCountyChange = (e) => {
    setCounty(e.target.value);
  };

  const handleSubcountyChange = (e) => {
    setSubcounty(e.target.value);
  };

  const filteredProperties = properties.filter((property) =>
    property.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
        <div className="search-container">
        <div className="filters">
          <label htmlFor="region">Region:</label>
          <select id="region" value={region} onChange={handleRegionChange}>
            <option value="">Select Region</option>
            {/* Add dynamic options if needed */}
          </select>

          <label htmlFor="county">County:</label>
          <select id="county" value={county} onChange={handleCountyChange}>
            <option value="">Select County</option>
            {/* Add dynamic options if needed */}
          </select>

          <label htmlFor="subcounty">Subcounty:</label>
          <select id="subcounty" value={subcounty} onChange={handleSubcountyChange}>
            <option value="">Select Subcounty</option>
            {/* Add dynamic options if needed */}
          </select>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search properties..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearchClick} className="search-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>

      <Map properties={filteredProperties} />

      <h2>Featured Rentals</h2>
      <div>
        {featuredProperties.map((property) => (
          <div key={property._id} className="property-card">
            <h3>{property.title}</h3>
            <p>{property.description}</p>
            <p>Price: ${property.price}</p>
            {/* Add images and videos */}
          </div>
        ))}
      </div>
      <p>
        Are you a homeowner/agent who wants to post rentals to Hama Bwana?
        <button onClick={() => window.location.href = '/register'}>Register now</button>
      </p>
    </div>
  );
};

export default Home;
