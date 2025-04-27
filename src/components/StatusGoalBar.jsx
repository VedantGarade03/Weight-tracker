function StatusGoalBar({ currentWeight, goalWeight }) {
    const difference = (currentWeight - goalWeight).toFixed(1);
    const statusText = difference > 0
      ? `${difference} kg above your goal`
      : `${Math.abs(difference)} kg below your goal`;
  
    return (
      <div className="w-full max-w-7xl mx-auto p-4">
        <div className="bg-gradient-to-r from-indigo-100 via-indigo-100 to-blue-100 rounded-2xl p-5 flex items-center justify-between">
          
          {/* Left side: Status */}
          <div>
            <div className="text-xs text-gray-500 mb-1">Status</div>
            <div className="text-lg font-bold text-indigo-600">
              {statusText}
            </div>
          </div>
  
          {/* Right side: Goal */}
          <div className="text-right">
            <div className="text-xs text-gray-500 mb-1">Goal</div>
            <div className="text-lg font-bold text-gray-800">
              {goalWeight} kg
            </div>
          </div>
  
        </div>
      </div>
    );
  }
  
  export default StatusGoalBar;