import React, { useState, useEffect } from 'react';
// useNavigate is removed
import Popup from './components/Popup';
import StatusGoalBar from './components/StatusGoalBar';
import TrendAndBMI from './components/TrendAndBMI';
import WeightHistory from './components/WeightHistory';
import './App.css';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
console.log('Using BASE_URL:', BASE_URL);

// Login Component
function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      onLogin(data.username);
    } else {
      setError(data.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100" id="login-form">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full transition duration-200 ease-in-out"
        >
          Login
        </button>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <button
            onClick={() => {
              document.getElementById('login-form').style.display = 'none';
              document.getElementById('signup-form').style.display = 'block';
            }}
            className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer"
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
}

// Signup Component
function Signup({ onLogin }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [height, setHeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [error, setError] = useState('');
  const [showLogin, setShowLogin] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError('Username and password are required');
            return;
        }

        const res = await fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, username, password, height, goalWeight }),
        });

        const data = await res.json();
        if (res.ok) {
            onLogin(data.username);
        } else {
            setError(data.message || 'Signup failed');
        }
    };

  const handleShowLogin = () => setShowLogin(true);

  if (showLogin) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100" id="signup-form" style={{ display: 'flex' }}>
        <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm" onSubmit={(e) => {
          e.preventDefault();
          const username = e.target.username.value;
          const password = e.target.password.value;
          onLogin(username);
        }}>
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Login</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <input
            type="text"
            placeholder="Username"
            name="username"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full transition duration-200 ease-in-out"
            >
            Login
          </button>
          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => setShowLogin(false)}
              className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer"
              >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100" id="signup-form" style={{ display: 'flex' }}>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Sign Up</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
          />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
          />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
          />
        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <input
          type="number"
          placeholder="Goal Weight (kg)"
          value={goalWeight}
          onChange={(e) => setGoalWeight(e.target.value)}
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full transition duration-200 ease-in-out"
          >
          Sign Up
        </button>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <button
            type="button"
            onClick={handleShowLogin}
            className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer"
            >
            Login
          </button>
        </p>
      </form>
    </div>
  );
}

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [heightCm, setHeightCm] = useState(170);
  const [goalWeight, setGoalWeight] = useState(75);
  const [weightHistory, setWeightHistory] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Check for a logged-in user in local storage on initial load
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setLoggedInUser(storedUser);
    }
    setLoading(false); // Set loading to false after checking local storage
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      const fetchData = async () => {
        setLoading(true); // Start loading data
        try {
          // Fetch weight history
          const weightRes = await fetch(`${BASE_URL}/weights/${loggedInUser}`);
          const weightData = await weightRes.json();
          setWeightHistory(weightData);
          if (weightData.length > 0) {
            setCurrentWeight(weightData[weightData.length - 1].weight);
          }

          // Fetch user profile (height and goal weight)
          const profileRes = await fetch(`${BASE_URL}/users/${loggedInUser}/profile`);
          if (profileRes.ok) {
            const profileData = await profileRes.json();
            setHeightCm(profileData.height || 0);
            setGoalWeight(profileData.goalWeight || 0);
          } else {
            console.error('Failed to fetch user profile');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false); // Stop loading
        }
      };
      fetchData();
    }
  }, [loggedInUser]);

    const saveNewWeight = async (newWeight) => {
        const today = new Date().toISOString().slice(0, 10);

        const res = await fetch(`${BASE_URL}/weights/${loggedInUser}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ weight: newWeight, date: today }),
        });

        const data = await res.json();
        if (res.ok) {
            setWeightHistory(prevHistory => [...prevHistory, data]);
            setCurrentWeight(newWeight);
            setShowPopUp(false);
        } else {
            console.error('Failed to save weight:', data);
        }
    };

  const handleDeleteWeight = async (id) => {
    const res = await fetch(`${BASE_URL}/weights/${loggedInUser}/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setWeightHistory(prevHistory => prevHistory.filter(entry => entry.id !== id));
      if (weightHistory.length > 0 && weightHistory[weightHistory.length - 1].id === id) {
        setCurrentWeight(weightHistory[weightHistory.length - 2]?.weight || 0);
      }
    } else {
      console.error("Failed to delete weight");
    }
  };

  const handleLogin = (username) => {
    setLoggedInUser(username);
    localStorage.setItem('loggedInUser', username);
    // Hide login and signup forms after successful login
        if (document.getElementById('login-form'))
            document.getElementById('login-form').style.display = 'none';
        if (document.getElementById('signup-form'))
            document.getElementById('signup-form').style.display = 'none';
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('loggedInUser');
        if (document.getElementById('login-form'))
            document.getElementById('login-form').style.display = 'block';
        if (document.getElementById('signup-form'))
            document.getElementById('signup-form').style.display = 'none';
  };

    const updateUserProfile = async (newHeight, newGoalWeight) => {
        if (!loggedInUser) return;
        try {
            const res = await fetch(`${BASE_URL}/users/${loggedInUser}/profile`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ height: newHeight, goalWeight: newGoalWeight }),
            });
            if (res.ok) {
                console.log('User profile updated successfully');
                setHeightCm(newHeight);
                setGoalWeight(newGoalWeight);
            } else {
                console.error('Failed to update user profile');
            }
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p> {/* Simple loading indicator */}
      </div>
    );
  }

  return (
    <div className="App">
      {loggedInUser ? (
        <>
          <header className="bg-gradient-to-r from-green-400 to-blue-500 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
              <p className="text-white text-sm mt-1">Welcome, {loggedInUser}!</p>
              <h1 className="text-white text-3xl font-bold">WeightTracker</h1>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          </header>

          <br />

          <div className="bg-white rounded-2xl shadow-md p-6 mx-auto max-w-7xl flex flex-col gap-4">
            <h2 className="text-indigo-500 text-2xl font-bold">Record Your Weight</h2>
            <button
              type="button"
              className="bg-gradient-to-r from-cyan-400 to-indigo-500 text-white px-6 py-2 rounded-lg hover:from-cyan-500 hover:to-indigo-600 transition self-start"
              onClick={() => setShowPopUp(true)}
            >
              Record Weight
            </button>
          </div>

          {showPopUp && (
            <Popup
              onClose={() => setShowPopUp(false)}
              saveWeight={saveNewWeight}
            />
          )}

          <br />

          <StatusGoalBar currentWeight={currentWeight} goalWeight={goalWeight} />

          <TrendAndBMI
            weightHistory={weightHistory}
            currentWeight={currentWeight}
            goalWeight={goalWeight}
            heightCm={heightCm}
            setHeightCm={setHeightCm}
            setGoalWeight={setGoalWeight}
            updateUserProfile={updateUserProfile}
          />
          <WeightHistory weightHistory={weightHistory} onDeleteWeight={handleDeleteWeight} />
        </>
      ) : (
        <>
          <Login onLogin={handleLogin} />
          <Signup onLogin={handleLogin} />
        </>
      )}
    </div>
  );
}

export default App;
