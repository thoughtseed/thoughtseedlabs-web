import React from 'react';
import { useStore } from '../store/useStore';

interface ProgressCounterProps {}

export const ProgressCounter: React.FC<ProgressCounterProps> = () => {
  const { visitedWaypoints, totalWaypoints, progress } = useStore();

  return (
    <div className="fixed top-4 right-4 z-50 bg-black bg-opacity-50 rounded-lg p-3 text-white font-bold">
      <div className="flex items-center space-x-2">
        <span className="text-lg">{visitedWaypoints.length}</span>
        <span className="text-lg">/</span>
        <span className="text-lg">{totalWaypoints}</span>
      </div>
      <div className="w-full h-1 bg-white bg-opacity-20 rounded-full mt-2">
        <div 
          className="h-full bg-white rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
