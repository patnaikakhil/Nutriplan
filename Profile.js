import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    gender: '',
    phoneNumber: '',
    height: '',
    weight: '',
    targetedWeight: '',
    protein: '',
    carbohydrates: '',
    fats: '',
    fiber: ''
  });

  const [healthGoals, setHealthGoals] = useState({
    goal: '',
    dietaryPreference: ''
  });

  useEffect(() => {
    // Fetch user data from the backend
    axios.get('http://localhost:5000/api/profile')
      .then(response => {
        setUser(response.data.user);
        setHealthGoals(response.data.healthGoals);
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleGoalChange = (e) => {
    const { name, value } = e.target;
    setHealthGoals(prevState => ({ ...prevState, [name]: value }));
  };

  const handleProfileUpdate = () => {
    // Update profile data in the backend
    axios.put('http://localhost:5000/api/profile', { user, healthGoals })
      .then(response => {
        alert('Profile updated successfully');
      })
      .catch(error => {
        console.error('Error updating profile:', error);
      });
  };

  return (
    <div>
      <h2>Profile</h2>
      <div>
        <label>First Name:</label>
        <input type="text" name="firstName" value={user.firstName} onChange={handleInputChange} />

        <label>Last Name:</label>
        <input type="text" name="lastName" value={user.lastName} onChange={handleInputChange} />

        <label>Username:</label>
        <input type="text" name="username" value={user.username} onChange={handleInputChange} disabled />

        <label>Email:</label>
        <input type="email" name="email" value={user.email} onChange={handleInputChange} />

        <label>Gender:</label>
        <input type="text" name="gender" value={user.gender} onChange={handleInputChange} />

        <label>Phone Number:</label>
        <input type="text" name="phoneNumber" value={user.phoneNumber} onChange={handleInputChange} />

        <label>Height (cm):</label>
        <input type="number" name="height" value={user.height} onChange={handleInputChange} />

        <label>Weight (kg):</label>
        <input type="number" name="weight" value={user.weight} onChange={handleInputChange} />

        <label>Targeted Weight (kg):</label>
        <input type="number" name="targetedWeight" value={user.targetedWeight} onChange={handleInputChange} />

        <label>Protein Intake (g):</label>
        <input type="number" name="protein" value={user.protein} onChange={handleInputChange} />

        <label>Carbohydrates Intake (g):</label>
        <input type="number" name="carbohydrates" value={user.carbohydrates} onChange={handleInputChange} />

        <label>Fats Intake (g):</label>
        <input type="number" name="fats" value={user.fats} onChange={handleInputChange} />

        <label>Fiber Intake (g):</label>
        <input type="number" name="fiber" value={user.fiber} onChange={handleInputChange} />
      </div>

      <h3>Health Goals</h3>
      <div>
        <label>Current Health Goal:</label>
        <input type="text" name="goal" value={healthGoals.goal} onChange={handleGoalChange} />

        <label>Dietary Preference:</label>
        <input type="text" name="dietaryPreference" value={healthGoals.dietaryPreference} onChange={handleGoalChange} />
      </div>

      <button onClick={handleProfileUpdate}>Update Profile</button>
    </div>
  );
}

export default Profile;
