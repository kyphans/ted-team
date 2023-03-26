import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { RouterProvider } from 'react-router-dom';
import { publicRouter } from './routes';
import './App.css';

function App() {
  return (
    <div className="App">
      <RouterProvider router={publicRouter} />
    </div>
  );
}

export default App;
