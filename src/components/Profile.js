// Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/profile');
        setUser(response.data.user);
        setRentals(response.data.rentals);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h2>Welcome, {user.name}!</h2>
      <div className="profile-info">
        <div className="profile-details">
          <img src={user.profilePicture} alt="Profile" className="profile-picture" />
          <p>{user.description}</p>
        </div>
        <div className="posted-rentals">
          <h3>Your Posted Rentals</h3>
          {rentals.length === 0 ? (
            <p>No rentals posted yet.</p>
          ) : (
            rentals.map(rental => (
              <div key={rental._id} className="rental-item">
                <h4>{rental.name}</h4>
                <p>{rental.description}</p>
                {/* Add more details like images, price, etc. */}
              </div>
            ))
          )}
        </div>
      </div>
      <button onClick={() => console.log('Navigate to posting page')}>Do you have new rentals? Post here.</button>
    </div>
  );
};

export default Profile;
