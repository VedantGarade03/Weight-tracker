import { useState, useEffect } from 'react';
import './App.css';
import Popup from './components/popup';
import StatusGoalBar from './components/StatusGoalBar';
import TrendAndBMI from './components/TrendAndBMI';
import WeightHistory from './components/WeightHistory';

function App() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [currentWeight, setCurrentWeight] = useState(69);
  const [heightCm, setHeightCm] = useState(170);
  const [goalWeight, setGoalWeight] = useState(75);

  const [weightHistory, setWeightHistory] = useState(() => {
    const saved = localStorage.getItem('weightHistory');
    return saved ? JSON.parse(saved) : [{ date: new Date().toISOString().slice(0, 10), weight: 69 }];
  });

  // Whenever weightHistory changes, update localStorage
  useEffect(() => {
    localStorage.setItem('weightHistory', JSON.stringify(weightHistory));
  }, [weightHistory]);

  const saveNewWeight = (newWeight) => {
    const today = new Date().toISOString().slice(0, 10);
    setCurrentWeight(newWeight);
    setWeightHistory(prev => [
      ...prev,
      { id: Date.now(), date: today, weight: newWeight }  // <-- added id
    ]);
  };

  const handleDelete = (id) => {
    setWeightHistory(prevHistory => prevHistory.filter(entry => entry.id !== id));
  };

  return (
    <>
      <header className="bg-gradient-to-r from-green-400 to-blue-500 p-4 shadow-md">
        <div className="container mx-auto text-center">
          <h1 className="text-white text-3xl font-bold">WeightTracker</h1>
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
      />

      <WeightHistory
        weightHistory={weightHistory}
        onDeleteWeight={handleDelete}/>
    </>
  );
}

export default App;
