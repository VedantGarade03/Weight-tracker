import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { X } from 'lucide-react';

function TrendAndBMI({ weightHistory, currentWeight, goalWeight, heightCm, setHeightCm, setGoalWeight }) {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [newHeight, setNewHeight] = useState(heightCm);
  const [newGoalWeight, setNewGoalWeight] = useState(goalWeight);
  const [selectedRange, setSelectedRange] = useState('Month');

  const heightM = heightCm / 100;
  const bmi = (currentWeight / (heightM * heightM)).toFixed(1);

  let bmiCategory = "";
  if (bmi < 18.5) bmiCategory = "Underweight";
  else if (bmi < 25) bmiCategory = "Normal";
  else if (bmi < 30) bmiCategory = "Overweight";
  else bmiCategory = "Obese";

  const handleSaveProfile = () => {
    setHeightCm(Number(newHeight));
    setGoalWeight(Number(newGoalWeight));
    setShowEditProfile(false);
  };

  const getFilteredData = () => {
    const now = new Date();
    let cutoffDate = new Date();

    if (selectedRange === 'Week') {
      cutoffDate.setDate(now.getDate() - 7);
    } else if (selectedRange === 'Month') {
      cutoffDate.setMonth(now.getMonth() - 1);
    } else if (selectedRange === '6 Months') {
      cutoffDate.setMonth(now.getMonth() - 6);
    } else if (selectedRange === 'Year') {
      cutoffDate.setFullYear(now.getFullYear() - 1);
    }

    return weightHistory.filter(entry => new Date(entry.date) >= cutoffDate);
  };

  const filteredData = getFilteredData();

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 max-w-7xl mx-auto">
      {/* Weight Trend */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex-1 flex flex-col justify-between min-h-[450px]">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-indigo-600">Weight Trend</h2>
            <div className="text-sm text-red-400 font-semibold flex items-center">
              ↑ {filteredData.length > 1 ? (filteredData.at(-1).weight - filteredData[0].weight).toFixed(1) : 0} kg
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-gray-100 rounded-full p-1 flex items-center justify-between mb-6 w-full max-w-md mx-auto">
            {['Week', 'Month', '6 Months', 'Year'].map(range => (
              <button
                key={range}
                onClick={() => setSelectedRange(range)}
                className={`px-4 py-1 text-sm font-medium rounded-full ${
                  selectedRange === range
                    ? 'bg-white shadow text-indigo-600'
                    : 'text-gray-500 hover:text-indigo-400'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={['dataMin-5', 'dataMax+5']} />
            <Tooltip />
            <Line
              type="natural" // makes it curved
              dataKey="weight"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ r: 5, stroke: '#6366f1', fill: 'white', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* BMI Calculator */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex-1 flex flex-col justify-between min-h-[450px]">
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-bold text-indigo-600 text-center">BMI Calculator</h2>

          {/* BMI Ranges */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Underweight</span>
              <span>Normal</span>
              <span>Overweight</span>
              <span>Obese</span>
            </div>
            <div className="relative h-2 bg-red-300 rounded-full">
              <div className="absolute h-2 rounded-full left-[10%] w-[30%] bg-green-400"></div>
              <div className="absolute h-2 rounded-full left-[40%] w-[15%] bg-yellow-300"></div>
              {/* BMI pointer */}
              <div
                className="absolute -top-1 w-4 h-4 border-2 border-indigo-400 rounded-full bg-white"
                style={{ left: `${Math.min(Math.max(((bmi - 10) / 20) * 100, 0), 100)}%` }}
              />
            </div>
          </div>

          {/* BMI Number */}
          <div className="text-5xl font-bold text-center">{bmi}</div>
          <div className="text-center text-lg font-semibold text-gray-600">{bmiCategory}</div>

          {/* Stats */}
          <div className="text-sm text-gray-500 flex flex-col gap-2">
            <div>Height: <span className="font-semibold text-gray-700">{heightCm} cm</span></div>
            <div>Current Weight: <span className="font-semibold text-gray-700">{currentWeight} kg</span></div>
            <div>Goal Weight: <span className="font-semibold text-gray-700">{goalWeight} kg</span></div>
          </div>

          <button
            onClick={() => setShowEditProfile(true)}
            className="w-full bg-gray-100 hover:bg-gray-200 text-indigo-600 font-medium py-2 rounded-xl transition"
          >
            Edit Profile
          </button>
        </div>

        {/* Edit Profile Popup */}
        {showEditProfile && (
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-md">
              <button
                onClick={() => setShowEditProfile(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Height (cm)</label>
                  <input
                    type="number"
                    value={newHeight}
                    onChange={(e) => setNewHeight(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Goal Weight (kg)</label>
                  <input
                    type="number"
                    value={newGoalWeight}
                    onChange={(e) => setNewGoalWeight(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2"
                  />
                </div>
                <button
                  onClick={handleSaveProfile}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-xl"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrendAndBMI;
