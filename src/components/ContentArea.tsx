
import React from 'react';

interface ContentAreaProps {
  children?: React.ReactNode;
}

const ContentArea = ({ children }: ContentAreaProps) => {
  return (
    <div className="p-6">
      <div className="grid gap-6">
        {children || (
          <div className="bg-electron-item p-6 rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-4">Welcome to Electron Window</h2>
            <p className="text-electron-text-secondary mb-6">This is a demo of an Electron-style interface built with React and Tailwind CSS.</p>
            <p className="text-electron-text-secondary">You can customize this component to show your actual dashboard content.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentArea;
