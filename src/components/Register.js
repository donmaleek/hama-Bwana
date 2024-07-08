import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
    password: '',
    profilePicture: null
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, description, password, profilePicture } = formData;
    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('description', description);
    data.append('password', password);
    data.append('profilePicture', profilePicture);

    try {
      const response = await axios.post('http://localhost:5000/register', data);
      if (response.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      console.error('There was an error registering!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <input type="file" name="profilePicture" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
