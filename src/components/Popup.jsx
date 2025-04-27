import React, { useRef, useState } from 'react';
import { X } from 'lucide-react';

function Popup({ onClose, saveWeight }) {
  const modalRef = useRef();
  const [inputWeight, setInputWeight] = useState('');

  const close = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  const handleSave = () => {
    if (inputWeight) {
      saveWeight(Number(inputWeight));  // Call the function passed from App
      onClose();
    }
  };

  return (
    <div ref={modalRef} onClick={close} className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gray-200 rounded-xl shadow-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={30}/>
        </button>
        <div>
          <h1 className="text-3xl">Record Weight</h1>
          <p className="text-sm text-gray-500 mb-5">Enter your weight and optionally select a date.</p>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
            <input
              type="number"
              placeholder="Enter your weight"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              value={inputWeight}
              onChange={(e) => setInputWeight(e.target.value)}
            />
          </div>
          <button
            onClick={handleSave}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-xl"
          >
            Save Weight
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;