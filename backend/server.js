const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, getDoc, setDoc, updateDoc } = require('firebase/firestore');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMCCBx1TNxN20TG3lVm8WwSqGk0J09In8",
  authDomain: "weight-tracker03.firebaseapp.com",
  projectId: "weight-tracker03",
  storageBucket: "weight-tracker03.appspot.com",
  messagingSenderId: "588570072487",
  appId: "1:588570072487:web:d736e187b39c063a8d1282",
  measurementId: "G-CY5LL4KCVJ"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Signup route
app.post('/signup', async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const usersRef = collection(db, 'users');
    const userDoc = await getDoc(doc(usersRef, username));

    if (userDoc.exists()) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await setDoc(doc(usersRef, username), {
      email,
      username,
      password: hashedPassword,
      weights: []
    });

    res.status(201).json({ username });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ message: 'Signup failed' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userRef = doc(collection(db, 'users'), username);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userData = userDoc.data();
    const isMatch = await bcrypt.compare(password, userData.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ username });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed' });
  }
});

// Add new weight entry
app.post('/weights/:username', async (req, res) => {
  const { username } = req.params;
  const { weight, date } = req.body;

  try {
    const userRef = doc(db, 'users', username);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return res.status(404).json({ message: 'User not found' });
    }

    const entryId = Date.now().toString();
    const newEntry = { id: entryId, weight, date };

    const prevWeights = userDoc.data().weights || [];
    const updatedWeights = [...prevWeights, newEntry];

    await updateDoc(userRef, { weights: updatedWeights });

    res.status(201).json(newEntry);
  } catch (err) {
    console.error('Failed to save weight:', err);
    res.status(500).json({ message: 'Failed to save weight' });
  }
});

// Delete weight entry
app.delete('/weights/:username/:id', async (req, res) => {
  const { username, id } = req.params;

  try {
    const userRef = doc(db, 'users', username);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return res.status(404).json({ message: 'User not found' });
    }

    const weights = userDoc.data().weights || [];
    const updatedWeights = weights.filter(entry => entry.id !== id);

    await updateDoc(userRef, { weights: updatedWeights });

    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('Failed to delete weight:', err);
    res.status(500).json({ message: 'Failed to delete weight' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Get weight history for user
app.get('/weights/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const userRef = doc(db, 'users', username);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return res.status(404).json({ message: 'User not found' });
    }

    const weights = userDoc.data().weights || [];
    res.status(200).json(weights);
  } catch (err) {
    console.error('Failed to fetch weights:', err);
    res.status(500).json({ message: 'Failed to fetch weights' });
  }
});