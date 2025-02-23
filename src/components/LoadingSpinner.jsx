import React from 'react';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-blue-500"></div>
  </div>
);

export default LoadingSpinner;