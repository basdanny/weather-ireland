import React from 'react';

const ErrorMessage = ({ message }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center text-red-500 bg-red-100 px-4 py-2 rounded-lg">
      {message}
    </div>
  </div>
);

export default ErrorMessage;