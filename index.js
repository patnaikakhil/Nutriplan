const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yourpassword',
  database: 'nutriplan'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database');
});

// Fetch user profile data
app.get('/api/profile', (req, res) => {
  const userId = 1; // This should come from authentication/session
  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length > 0) {
      const user = result[0];
      db.query('SELECT * FROM health_goals WHERE userId = ?', [userId], (err, goalsResult) => {
        if (err) return res.status(500).send(err);
        const healthGoals = goalsResult.length > 0 ? goalsResult[0] : {};
        res.json({ user, healthGoals });
      });
    } else {
      res.status(404).send('User not found');
    }
  });
});

// Update user profile data
app.put('/api/profile', (req, res) => {
  const userId = 1; // This should come from authentication/session
  const { user, healthGoals } = req.body;

  db.query(
    'UPDATE users SET firstName = ?, lastName = ?, email = ?, gender = ?, phoneNumber = ?, height = ?, weight = ?, targetedWeight = ?, protein = ?, carbohydrates = ?, fats = ?, fiber = ? WHERE id = ?',
    [
      user.firstName, user.lastName, user.email, user.gender, user.phoneNumber,
      user.height, user.weight, user.targetedWeight, user.protein, user.carbohydrates,
      user.fats, user.fiber, userId
    ],
    (err) => {
      if (err) return res.status(500).send(err);

      db.query(
        'REPLACE INTO health_goals (userId, goal, dietaryPreference) VALUES (?, ?, ?)',
        [userId, healthGoals.goal, healthGoals.dietaryPreference],
        (err) => {
          if (err) return res.status(500).send(err);
          res.send('Profile updated successfully');
        }
      );
    }
  );
});

// Fetch recommended recipes
app.get('/api/recipes', (req, res) => {
  const dietaryPreference = 'vegan'; // This should be based on user's health goal
  db.query(
    'SELECT * FROM recipes WHERE dietaryPreference = ?',
    [dietaryPreference],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result);
    }
  );
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
