import React from 'react';

interface ToggleGroupProps {
  children: React.ReactNode;
}

const ToggleGroup: React.FC<ToggleGroupProps> = ({ children }) => {
  return (
    <div className="fixed left-3 top-1/2 -translate-y-1/2 flex flex-col gap-4">
      {children}
    </div>
  );
};

export default ToggleGroup;
