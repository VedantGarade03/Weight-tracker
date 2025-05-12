const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, getDoc, setDoc, updateDoc, deleteDoc, arrayUnion } = require('firebase/firestore');
const bcrypt = require('bcrypt'); // Keep bcrypt for now, but PLEASE address later

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Firebase configuration (Replace placeholders DIRECTLY - BAD PRACTICE for production)
const firebaseConfig = {
  apiKey: "AIzaSyBMCCBx1TNxN20TG3lVm8WwSqGk0J09In8",
  authDomain: "weight-tracker03.firebaseapp.com",
  projectId: "weight-tracker03",
  storageBucket: "weight-tracker03.firebasestorage.app",
  messagingSenderId: "588570072487",
  appId: "1:588570072487:web:d736e187b39c063a8d1282",
  measurementId: "G-CY5LL4KCVJ"
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Your routes - signup, login, weights (but REMOVE any fs, loadData, saveData)
// Example (adjust your actual routes):
app.post('/signup', async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const usersRef = collection(db, 'users');
    const userDoc = await getDoc(doc(usersRef, username));

    if (userDoc.exists()) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // DO NOT SKIP HASHING IN REAL PRODUCTION
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

// ... (Other routes - login, weights)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});