import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeaturedRentals = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/properties/featured');
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching featured rentals:', error);
        // Handle error (e.g., show error message to user)
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="container">
      <h2>Featured Rentals</h2>
      <div>
        {properties.map((property) => (
          <div key={property._id} className="property-card">
            <h3>{property.title}</h3>
            <p>{property.description}</p>
            <p>Price: ${property.price}</p>
            {/* Add images and videos */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedRentals;
