import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="404">
      <h1>Something went wrong!</h1>
      
      <p>The page you requested was not found, or does not exist.</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default NotFound;