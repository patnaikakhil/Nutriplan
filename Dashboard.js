import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h2>Your Dashboard</h2>
      <Link to="/profile">Profile</Link>
      <Link to="/recipes">Recipes</Link>
      <Link to="/progress">Progress</Link>
    </div>
  );
}

export default Dashboard;
