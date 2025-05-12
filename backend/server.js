const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 5000;
const DATA_FILE = './data.json';

app.use(cors());
app.use(bodyParser.json());

// === Helper functions ===
function loadData() {
  if (!fs.existsSync(DATA_FILE)) return { users: [] };
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function getUser(data, identifier) {
  return data.users.find(u => u.username === identifier || u.email === identifier);
}

// === Routes ===

// Signup route
app.post('/signup', (req, res) => {
  const { email, username, password } = req.body;
  const data = loadData();

  const existingUser = getUser(data, username);
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }
    const existingEmail = data.users.find(u => u.email === email);
    if(existingEmail){
         return res.status(400).json({ message: 'Email already exists' });
    }

  const newUser = { email, username, password, weights: [] };
  data.users.push(newUser);
  saveData(data);

  res.status(201).json({ username });
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const data = loadData();

  const user = getUser(data, username); // Use the common getUser function
  if (user && user.password === password) {
    res.json({ username: user.username });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Get weights for a specific user
app.get('/weights/:username', (req, res) => {
  const { username } = req.params;
  const data = loadData();
  const user = getUser(data, username);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user.weights);
});

// Add a new weight for a specific user
app.post('/weights/:username', (req, res) => {
  const { username } = req.params;
  const data = loadData();
  const user = getUser(data, username);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const newWeight = { id: Date.now(), ...req.body };
  user.weights.push(newWeight);
  saveData(data);

  res.json(newWeight);
});

// Delete a weight by ID for a specific user
app.delete('/weights/:username/:id', (req, res) => {
  const { username, id } = req.params;
  const data = loadData();
  const user = getUser(data, username);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const weightIndex = user.weights.findIndex(w => w.id === Number(id));
  if (weightIndex === -1) {
    return res.status(404).json({ message: 'Weight entry not found' });
  }

  user.weights.splice(weightIndex, 1);
  saveData(data);
  res.json({ message: 'Weight entry deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
