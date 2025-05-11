const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Fake in-memory data (we’ll use files later)
let weightHistory = [];
let profile = { heightCm: 170, goalWeight: 75 };

// Get all weights
app.get('/weights', (req, res) => {
  res.json(weightHistory);
});

// Add a weight
app.post('/weights', (req, res) => {
  const newWeight = { id: Date.now(), ...req.body };
  weightHistory.push(newWeight);
  res.json(newWeight);
});

// Delete a weight
app.delete('/weights/:id', (req, res) => {
  const id = Number(req.params.id);
  weightHistory = weightHistory.filter(item => item.id !== id);
  res.status(204).send();
});

// Get profile
app.get('/profile', (req, res) => {
  res.json(profile);
});

// Update profile
app.put('/profile', (req, res) => {
  profile = { ...profile, ...req.body };
  res.json(profile);
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
