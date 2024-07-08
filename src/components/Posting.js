// Posting.js
import React, { useState } from 'react';
import axios from 'axios';

const Posting = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    region: '',
    county: '',
    subcounty: '',
    price: '',
    images: [],
    videos: []
  });

  const { name, description, region, county, subcounty, price, images, videos } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    const newRental = {
      name,
      description,
      region,
      county,
      subcounty,
      price,
      images,
      videos
    };

    try {
      const response = await axios.post('http://localhost:5000/properties', newRental);
      console.log('Rental published:', response.data);
      // Handle success, maybe redirect or show a success message
    } catch (error) {
      console.error('Error publishing rental:', error);
      // Handle error, show an error message
    }
  };

  return (
    <div className="posting-container">
      <h2>{formData.name ? `Post Your Rentals: ${formData.name}` : 'Post Your Rentals'}</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={name} onChange={onChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={description} onChange={onChange} required></textarea>
        </div>
        <div>
          <label>Region:</label>
          <input type="text" name="region" value={region} onChange={onChange} required />
        </div>
        <div>
          <label>County:</label>
          <input type="text" name="county" value={county} onChange={onChange} required />
        </div>
        <div>
          <label>Subcounty:</label>
          <input type="text" name="subcounty" value={subcounty} onChange={onChange} required />
        </div>
        <div>
          <label>Price in Kshs:</label>
          <input type="number" name="price" value={price} onChange={onChange} required />
        </div>
        <div>
          <label>Images:</label>
          <input type="file" name="images" multiple onChange={onChange} />
        </div>
        <div>
          <label>Videos:</label>
          <input type="file" name="videos" multiple onChange={onChange} />
        </div>
        <button type="submit">Publish</button>
      </form>
    </div>
  );
};

export default Posting;
