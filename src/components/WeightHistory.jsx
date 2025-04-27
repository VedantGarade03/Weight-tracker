import React from "react";

const WeightHistory = ({ weightHistory, onDeleteWeight }) => {
  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-6">
        
        {/* Heading inside the white box with indigo color */}
        <h2 className="text-center text-2xl font-bold text-indigo-600">Weight History</h2>

        {/* List or No Data */}
        {weightHistory.length === 0 ? (
          <p className="text-gray-400 text-center">No weight history yet.</p>
        ) : (
          <ul className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {weightHistory.map((entry) => (
              <li
                key={entry.id}
                className="flex items-center justify-between bg-indigo-50 p-4 rounded-2xl shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  {/* Weight Circle */}
                  <div className="w-12 h-12 min-w-12 min-h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">
                    {entry.weight}
                  </div>

                  {/* Text Info */}
                  <div className="flex flex-col">
                    <p className="text-gray-400 text-xs">{formatDate(entry.date)}</p>
                    <p className="font-semibold text-lg">{entry.weight} kg</p>
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => onDeleteWeight(entry.id)}
                  className="text-gray-400 hover:text-gray-600 font-semibold text-sm"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// Format date like 'Apr 27'
const formatDate = (dateString) => {
  const options = { month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default WeightHistory;
