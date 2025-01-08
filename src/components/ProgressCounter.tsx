import React from 'react';
import { useStore } from '../store/useStore';

interface ProgressCounterProps {}

export const ProgressCounter: React.FC<ProgressCounterProps> = () => {
  const { visitedWaypoints, totalWaypoints, progress } = useStore();

  return (
    <div className="fixed top-4 right-4 z-50 bg-black bg-opacity-40 rounded-lg p-4 text-white font-bold">
      <div className="flex items-center justify-center space-x-1">
        <span className="text-lg">{visitedWaypoints.length} / {totalWaypoints}</span>
        <span className="text-sm opacity-80 hidden md:inline">Completed</span>
      </div>
      <div className="w-full h-1 bg-white bg-opacity-20 rounded-full mt-2">
        <div 
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ 
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #8B5CF6 0%, #6366F1 50%, #3B82F6 100%)'
          }}
        />
      </div>
    </div>
  );
};
